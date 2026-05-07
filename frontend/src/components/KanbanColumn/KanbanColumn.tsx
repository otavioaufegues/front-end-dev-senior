import { useDroppable } from '@dnd-kit/react'
import { TaskCard } from '../TaskCard/TaskCard'
import type { StatusKey, Task } from '../../services/api/tasks'
import './KanbanColumn.css'

type Props = {
  title: string
  statusKey: StatusKey
  tasks: Task[]
  onAddTask: (statusKey: StatusKey) => void
}

export function KanbanColumn({
  title,
  statusKey,
  tasks,
  onAddTask,
}: Props) {
  const { ref, isDropTarget } = useDroppable({
    id: statusKey,
    data: {
      type: 'status',
      statusKey,
    },
  })

  return (
    <section
      className="kanbanColumn"
      aria-labelledby={`${statusKey}-title`}
      data-drop-target={isDropTarget}
      ref={ref}
    >
      <header className="kanbanColumnHeader">
        <div className="kanbanColumnTitleWrap">
          <h2 className="kanbanColumnTitle" id={`${statusKey}-title`}>
            {title}
          </h2>
          <span className="kanbanCount">{tasks.length}</span>
        </div>
      </header>

      <div className="kanbanTasks">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && <div className="kanbanEmpty">Nenhuma tarefa aqui.</div>}
      </div>

      <button type="button" className="kanbanAddButton" onClick={() => onAddTask(statusKey)}>
        + Adicionar tarefa
      </button>
    </section>
  )
}
