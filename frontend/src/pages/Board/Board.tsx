import { useState } from 'react'
import { CreateTaskModal } from '../../components/CreateTaskModal/CreateTaskModal'
import { KanbanColumn } from '../../components/KanbanColumn/KanbanColumn'
import { useKanban } from '../../hooks/useKanban'
import type { Board } from '../../services/api/boards'
import type { CreateTaskPayload, StatusKey, Task } from '../../services/api/tasks'
import type { ApiError } from '../../services/axios/axios'
import './Board.css'
import { ArrowBigLeft } from 'lucide-react';

type Props = {
  board: Board
  onBack: () => void
}

function getTaskErrorMessage(error: unknown): string {
  const apiError = error as ApiError
  if (apiError.status === 422) return 'Confira os campos e tente novamente.'
  if (error instanceof Error) return error.message

  return 'Nao foi possivel salvar a tarefa.'
}

export function BoardPage({ board, onBack }: Props) {
  const kanban = useKanban(board.id)
  const [taskStatusToCreate, setTaskStatusToCreate] = useState<StatusKey | null>(null)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [taskError, setTaskError] = useState<string | null>(null)
  const statusOptions = kanban.columns.map(column => ({ key: column.key, title: column.title }))

  async function handleCreateTask(payload: CreateTaskPayload) {
    setIsCreatingTask(true)
    setTaskError(null)

    try {
      await kanban.addTask(payload)
      setTaskStatusToCreate(null)
    } catch (error) {
      setTaskError(getTaskErrorMessage(error))
    } finally {
      setIsCreatingTask(false)
    }
  }

  async function handleMoveTask(task: Task, statusKey: StatusKey) {
    try {
      await kanban.moveTask(task, statusKey)
    } catch {
      return
    }
  }

  function handleCloseTaskModal() {
    if (isCreatingTask) return
    setTaskStatusToCreate(null)
    setTaskError(null)
  }

  return (
    <div className="boardShell">
      <header className="boardTopbar">
        <div>
          <button type="button" className="boardBack" onClick={onBack}>
             <ArrowBigLeft />Dashboard
          </button>
          <div className="boardTitleRow">
            <span className="boardTitleIcon" style={{ background: board.theme_color }} aria-hidden />
            <div>
              <h1 className="boardTitle">{board.name}</h1>
              <p className="boardSubtitle">{board.description || 'Kanban do board selecionado.'}</p>
            </div>
          </div>
        </div>

        <button type="button" className="boardPrimaryAction" onClick={() => setTaskStatusToCreate('todo')}>
          + Adicionar tarefa
        </button>
      </header>

      {kanban.status === 'loading' && <div className="boardState">Carregando tarefas...</div>}
      {kanban.status === 'error' && (
        <div className="boardState boardStateError">
          Erro ao carregar tarefas.
          <div>{kanban.error.message}</div>
        </div>
      )}

      <main className="kanbanBoard">
        {kanban.columns.map(column => (
          <KanbanColumn
            key={column.key}
            title={column.title}
            statusKey={column.key}
            tasks={column.tasks}
            statusOptions={statusOptions}
            onAddTask={setTaskStatusToCreate}
            onMoveTask={handleMoveTask}
          />
        ))}
      </main>

      <CreateTaskModal
        open={taskStatusToCreate !== null}
        statusKey={taskStatusToCreate ?? 'todo'}
        saving={isCreatingTask}
        error={taskError}
        onClose={handleCloseTaskModal}
        onCreate={handleCreateTask}
      />
    </div>
  )
}
