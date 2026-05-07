import { useEffect, useId, useState, type FormEvent } from 'react'
import type { CreateTaskPayload, StatusKey } from '../../services/api/tasks'
import './CreateTaskModal.css'

type Props = {
  open: boolean
  statusKey: StatusKey
  saving?: boolean
  error?: string | null
  onClose: () => void
  onCreate: (payload: CreateTaskPayload) => Promise<void>
}

export function CreateTaskModal({ open, statusKey, saving = false, error, onClose, onCreate }: Props) {
  const titleId = useId()
  const descriptionId = useId()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal')
  const [titleTouched, setTitleTouched] = useState(false)

  useEffect(() => {
    if (!open) return

    setTitle('')
    setDescription('')
    setPriority('normal')
    setTitleTouched(false)
  }, [open])

  if (!open) return null

  const titleError = titleTouched && !title.trim() ? 'Informe o titulo da tarefa.' : null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTitleTouched(true)

    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    await onCreate({
      title: trimmedTitle,
      description: description.trim() || null,
      priority,
      status_key: statusKey,
    })
  }

  return (
    <div className="ctmBackdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="ctm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <header className="ctmHeader">
          <div>
            <h2 id="create-task-title" className="ctmTitle">
              Nova tarefa
            </h2>
            <p className="ctmSubtitle">Adicione uma tarefa na coluna selecionada.</p>
          </div>
          <button type="button" className="ctmIconButton" aria-label="Fechar" onClick={onClose}>
            x
          </button>
        </header>

        <form className="ctmForm" onSubmit={handleSubmit}>
          <label className="ctmField" htmlFor={titleId}>
            <span>Título</span>
            <input
              id={titleId}
              value={title}
              onChange={event => setTitle(event.target.value)}
              onBlur={() => setTitleTouched(true)}
              placeholder="Ex: Revisar fluxo de onboarding"
              maxLength={255}
              autoFocus
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? `${titleId}-error` : undefined}
            />
            {titleError && (
              <span className="ctmError" id={`${titleId}-error`}>
                {titleError}
              </span>
            )}
          </label>

          <label className="ctmField" htmlFor={descriptionId}>
            <span>Descrição</span>
            <textarea
              id={descriptionId}
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Contexto rapido da tarefa"
              maxLength={5000}
              rows={4}
            />
          </label>

          <fieldset className="ctmFieldset">
            <legend>Prioridade</legend>
            <div className="ctmSegment">
              <button
                type="button"
                aria-pressed={priority === 'normal'}
                onClick={() => setPriority('normal')}
              >
                Normal
              </button>
              <button
                type="button"
                aria-pressed={priority === 'urgent'}
                onClick={() => setPriority('urgent')}
              >
                Urgente
              </button>
            </div>
          </fieldset>

          {error && <div className="ctmSubmitError">{error}</div>}

          <footer className="ctmActions">
            <button type="button" className="ctmButton ctmButtonGhost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="ctmButton ctmButtonPrimary" disabled={saving}>
              {saving ? 'Criando...' : 'Criar tarefa'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}
