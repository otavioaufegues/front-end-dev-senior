import {
  BriefcaseBusiness,
  KanbanSquare,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Rocket,
  Sparkles,
  Target,
  Trash2,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import type { Board } from '../../services/api/boards'
import { formatLastActivity, truncate } from '../../utils/format'
import './DashboardBoardCard.css'

type Props = {
  board: Board
  onOpen?: (board: Board) => void
  onDelete?: (board: Board) => void
}

const boardIcons: Record<string, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  kanban: KanbanSquare,
  layout: LayoutDashboard,
  megaphone: Megaphone,
  'message-square': MessageSquare,
  rocket: Rocket,
  spark: Sparkles,
  target: Target,
}

function BoardIcon({ icon, color }: { icon: string; color: string }) {
  const Icon = boardIcons[icon] ?? LayoutDashboard

  return (
    <div className="dbcIcon" style={{ background: color }} title={icon} aria-hidden>
      <Icon size={19} strokeWidth={2.25} />
    </div>
  )
}

export function DashboardBoardCard({ board, onOpen, onDelete }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const desc = board.description?.trim() ? truncate(board.description, 140) : 'Sem descricao.'

  function handleDelete() {
    setIsMenuOpen(false)

    const confirmed = window.confirm(`Apagar o board "${board.name}"? Esta acao tambem remove suas tarefas.`)
    if (!confirmed) return

    onDelete?.(board)
  }

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
        <div className="dbcMenuWrap" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="dbcMenu"
            aria-label="Menu do board"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(current => !current)}
          >
            ...
          </button>

          {isMenuOpen && (
            <div className="dbcDropdown" role="menu">
              <button type="button" className="dbcDropdownItem" role="menuitem" onClick={handleDelete}>
                <Trash2 size={15} strokeWidth={2.2} />
                Apagar board
              </button>
            </div>
          )}
        </div>
      </header>

      <h2 className="dbcTitle">{board.name}</h2>
      <p className="dbcDesc">{desc}</p>

      <div className="dbcBadges">
        {board.tasks_count_by_status.todo > 0 && (
          <span className="dbcBadge dbcBadgeTodo">{board.tasks_count_by_status.todo} To do</span>
        )}
      </div>

      <footer className="dbcFooter">
        <span className="dbcStat" title="Total de tarefas">
          {board.tasks_count_total} tasks
        </span>
        <span className="dbcStat" title="Ultima atividade">
          {formatLastActivity(board.last_activity_at)}
        </span>
      </footer>
    </article>
  )
}
