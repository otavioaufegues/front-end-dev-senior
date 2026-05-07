import type { StatusKey, Task } from '../../services/api/tasks'
import './TaskCard.css'

type Props = {
  task: Task
  statusOptions: Array<{ key: StatusKey; title: string }>
  onMove: (task: Task, statusKey: StatusKey) => void
}

export function TaskCard({ task, statusOptions, onMove }: Props) {
  const description = task.description?.trim()
  const isDone = task.status.key === 'done'

  return (
    <article className="taskCard" data-priority={task.priority} data-done={isDone}>
      <div className="taskPriority" aria-hidden />
      <div className="taskBody">
        <div className="taskHeader">
          <h3 className="taskTitle">{task.title}</h3>
          {task.priority === 'urgent' && <span className="taskBadge">Urgente</span>}
        </div>

        <p className="taskDescription">{description || 'Sem descricao.'}</p>

        <div className="taskActions" aria-label="Mover tarefa">
          {statusOptions
            .filter(option => option.key !== task.status.key)
            .map(option => (
              <button
                key={option.key}
                type="button"
                className="taskMoveButton"
                onClick={() => onMove(task, option.key)}
              >
                {option.title}
              </button>
            ))}
        </div>
      </div>
    </article>
  )
}
