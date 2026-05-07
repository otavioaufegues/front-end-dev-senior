import { useDraggable } from '@dnd-kit/react'
import type { Task } from '../../services/api/tasks'
import './TaskCard.css'

type Props = {
  task: Task
}

type TaskDragData = {
  type: 'task'
  task: Task
}

export function TaskCard({ task }: Props) {
  const { ref, isDragging } = useDraggable<TaskDragData>({
    id: `task-${task.id}`,
    data: {
      type: 'task',
      task,
    },
  })
  const description = task.description?.trim()
  const isDone = task.status.key === 'done'

  return (
    <article
      className="taskCard"
      data-priority={task.priority}
      data-done={isDone}
      data-dragging={isDragging}
      ref={ref}
    >
      <div className="taskPriority" aria-hidden />
      <div className="taskBody">
        <div className="taskHeader">
          <h3 className="taskTitle">{task.title}</h3>
          {task.priority === 'urgent' && <span className="taskBadge">Urgente</span>}
        </div>

        <p className="taskDescription">{description || 'Sem descricao.'}</p>
      </div>
    </article>
  )
}
