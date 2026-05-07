import type { Board } from '../../services/api/boards'
import { formatLastActivity, truncate } from '../../utils/format'
import './DashboardBoardCard.css'

type Props = {
  board: Board
  onOpen?: (board: Board) => void
}

/** TODO MVP: ícone por string vinda da API; depois você troca por lucide-react etc. */
function BoardIcon({ icon, color }: { icon: string; color: string }) {
  return (
    <div
      className="dbcIcon"
      style={{ background: color }}
      title={icon}
      aria-hidden
    />
  )
}

export function DashboardBoardCard({ board, onOpen }: Props) {
  const desc = board.description?.trim()
    ? truncate(board.description, 140)
    : 'Sem descrição.'

  return (
    <article
      className="dbc"
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(board)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen?.(board)
        }
      }}
    >
      <header className="dbcHeader">
        <BoardIcon icon={board.icon} color={board.theme_color} />
        <button
          type="button"
          className="dbcMenu"
          aria-label="Menu do board"
          onClick={e => e.stopPropagation()}
        >
          ⋯
        </button>
      </header>

      <h2 className="dbcTitle">{board.name}</h2>
      <p className="dbcDesc">{desc}</p>

      <div className="dbcBadges">
        {board.tasks_count_by_status.todo > 0 && (
          <span className="dbcBadge dbcBadgeTodo">
            {board.tasks_count_by_status.todo} To do
          </span>
        )}
      </div>

      <footer className="dbcFooter">
        <span className="dbcStat" title="Total de tarefas">
            {board.tasks_count_total} tasks
        </span>
        <span className="dbcStat" title="Última atividade">
            {formatLastActivity(board.last_activity_at)}
        </span>
      </footer>

      <div className="dbcAvatars" aria-hidden>
        <span className="dbcAvatar">?</span>
      </div>
    </article>
  )
}