import { useEffect, useId, useState, type FormEvent } from 'react'
import type { CreateBoardPayload } from '../../services/api/boards'
import './CreateBoardModal.css'

const colorOptions = ['#7c3aed', '#2563eb', '#059669', '#dc2626', '#ea580c', '#4f46e5']
const iconOptions = ['layout', 'kanban', 'rocket', 'briefcase', 'target', 'spark']

type Props = {
  open: boolean
  saving?: boolean
  error?: string | null
  onClose: () => void
  onCreate: (payload: CreateBoardPayload) => Promise<void>
}

export function CreateBoardModal({ open, saving = false, error, onClose, onCreate }: Props) {
  const nameId = useId()
  const descriptionId = useId()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [themeColor, setThemeColor] = useState(colorOptions[0])
  const [icon, setIcon] = useState(iconOptions[0])
  const [nameTouched, setNameTouched] = useState(false)

  useEffect(() => {
    if (!open) return

    setName('')
    setDescription('')
    setThemeColor(colorOptions[0])
    setIcon(iconOptions[0])
    setNameTouched(false)
  }, [open])

  if (!open) return null

  const nameError = nameTouched && !name.trim() ? 'Informe o nome do board.' : null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNameTouched(true)

    const trimmedName = name.trim()
    if (!trimmedName) return

    await onCreate({
      name: trimmedName,
      description: description.trim() || null,
      theme_color: themeColor,
      icon,
    })
  }

  return (
    <div className="cbmBackdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="cbm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-board-title"
        onMouseDown={event => event.stopPropagation()}
      >
        <header className="cbmHeader">
          <div>
            <h2 id="create-board-title" className="cbmTitle">
              Criar novo board
            </h2>
            <p className="cbmSubtitle">Organize um novo fluxo de tarefas.</p>
          </div>
          <button type="button" className="cbmIconButton" aria-label="Fechar" onClick={onClose}>
            x
          </button>
        </header>

        <form className="cbmForm" onSubmit={handleSubmit}>
          <label className="cbmField" htmlFor={nameId}>
            <span>Nome</span>
            <input
              id={nameId}
              value={name}
              onChange={event => setName(event.target.value)}
              onBlur={() => setNameTouched(true)}
              placeholder="Ex: Produto, Marketing, Suporte"
              maxLength={255}
              autoFocus
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? `${nameId}-error` : undefined}
            />
            {nameError && (
              <span className="cbmError" id={`${nameId}-error`}>
                {nameError}
              </span>
            )}
          </label>

          <label className="cbmField" htmlFor={descriptionId}>
            <span>Descricao</span>
            <textarea
              id={descriptionId}
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Resumo rapido do objetivo desse board"
              maxLength={5000}
              rows={4}
            />
          </label>

          <fieldset className="cbmFieldset">
            <legend>Cor</legend>
            <div className="cbmSwatches">
              {colorOptions.map(color => (
                <button
                  key={color}
                  type="button"
                  className="cbmSwatch"
                  style={{ background: color }}
                  aria-label={`Selecionar cor ${color}`}
                  aria-pressed={themeColor === color}
                  onClick={() => setThemeColor(color)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="cbmFieldset">
            <legend>Icone</legend>
            <div className="cbmIconGrid">
              {iconOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  className="cbmIconChoice"
                  aria-pressed={icon === option}
                  onClick={() => setIcon(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          {error && <div className="cbmSubmitError">{error}</div>}

          <footer className="cbmActions">
            <button type="button" className="cbmButton cbmButtonGhost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="cbmButton cbmButtonPrimary" disabled={saving}>
              {saving ? 'Criando...' : 'Criar board'}
            </button>
          </footer>
        </form>
      </section>
    </div>
  )
}
