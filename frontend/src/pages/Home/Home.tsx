import { useBoards } from '../../hooks/useBoards'
import { useState } from 'react'
import { DashboardBoardCard } from '../../components/DashboardBoardCard/DashboardBoardCard'
import { CreateBoardCard } from '../../components/CreateBoardCard/CreateBoardCard'

import './Home.css'

export function Home() {
  const boards = useBoards()
  const [activeId, setActiveId] = useState<number | null>(null)


  return (
    <div className="homeShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandTitle">KanbanFlow</div>
          <div className="workspace">My Workspace</div>
        </div>

        <div className="navItem" aria-current="page">
          Dashboard
        </div>

        <div className="sectionTitle">Boards</div>

        {boards.status === 'loading' && <div>Carregando boards…</div>}
        {boards.status === 'error' && (
          <div>
            Erro ao carregar boards.
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
              {boards.error.message}
            </div>
          </div>
        )}

        {boards.status === 'success' && (
          <div className="boardList">
            {boards.data.map(b => (
              <div className="boardItem" key={b.id}>
                <span className="boardDot" style={{ background: b.theme_color }} />
                <div>
                  <div className="boardName">{b.name}</div>
                  <div className="boardMeta">{b.tasks_count_total} tasks</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      <main className="content">
        <div className="dashGrid">
          <CreateBoardCard onClick={() => {}} />
          {boards.status === 'success' &&
            boards.data.map(b => (
              <DashboardBoardCard
                key={b.id}
                board={b}
                onOpen={board => {
                  setActiveId(board.id)
                }}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

