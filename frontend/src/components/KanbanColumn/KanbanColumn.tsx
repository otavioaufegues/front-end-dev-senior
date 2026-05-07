import { TaskCard } from '../TaskCard/TaskCard'
import type { StatusKey, Task } from '../../services/api/tasks'
import './KanbanColumn.css'

type Props = {
  title: string
  statusKey: StatusKey
  tasks: Task[]
  statusOptions: Array<{ key: StatusKey; title: string }>
  onAddTask: (statusKey: StatusKey) => void
  onMoveTask: (task: Task, statusKey: StatusKey) => void
}

export function KanbanColumn({
  title,
  statusKey,
  tasks,
  statusOptions,
  onAddTask,
  onMoveTask,
}: Props) {
  return (
    <section className="kanbanColumn" aria-labelledby={`${statusKey}-title`}>
      <header className="kanbanColumnHeader">
        <div className="kanbanColumnTitleWrap">
          <h2 className="kanbanColumnTitle" id={`${statusKey}-title`}>
            {title}
          </h2>
          <span className="kanbanCount">{tasks.length}</span>
        </div>
        <button type="button" className="kanbanColumnMenu" aria-label={`Menu ${title}`}>
          ...
        </button>
      </header>

      <div className="kanbanTasks">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} statusOptions={statusOptions} onMove={onMoveTask} />
        ))}

        {tasks.length === 0 && <div className="kanbanEmpty">Nenhuma tarefa aqui.</div>}
      </div>

      <button type="button" className="kanbanAddButton" onClick={() => onAddTask(statusKey)}>
        + Adicionar tarefa
      </button>
    </section>
  )
}
