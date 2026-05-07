import { useState } from 'react'
import { DashboardBoardCard } from '../../components/DashboardBoardCard/DashboardBoardCard'
import { CreateBoardCard } from '../../components/CreateBoardCard/CreateBoardCard'
import { CreateBoardModal } from '../../components/CreateBoardModal/CreateBoardModal'
import { useBoards } from '../../hooks/useBoards'
import type { CreateBoardPayload } from '../../services/api/boards'
import type { ApiError } from '../../services/axios/axios'

import './Home.css'

function getCreateErrorMessage(error: unknown): string {
  const apiError = error as ApiError
  if (apiError.status === 422) return 'Confira os campos e tente novamente.'
  if (error instanceof Error) return error.message

  return 'Nao foi possivel criar o board.'
}

export function Home() {
  const boards = useBoards()
  const [activeId, setActiveId] = useState<number | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  async function handleCreateBoard(payload: CreateBoardPayload) {
    setIsCreating(true)
    setCreateError(null)

    try {
      await boards.createBoard(payload)
      setIsCreateOpen(false)
    } catch (error) {
      setCreateError(getCreateErrorMessage(error))
    } finally {
      setIsCreating(false)
    }
  }

  function handleCloseCreate() {
    if (isCreating) return
    setIsCreateOpen(false)
    setCreateError(null)
  }

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

        {boards.status === 'loading' && <div>Carregando boards...</div>}
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
            {boards.data.map(board => (
              <button
                type="button"
                className="boardItem"
                aria-current={activeId === board.id ? 'true' : undefined}
                key={board.id}
                onClick={() => setActiveId(board.id)}
              >
                <span className="boardDot" style={{ background: board.theme_color }} />
                <div>
                  <div className="boardName">{board.name}</div>
                  <div className="boardMeta">{board.tasks_count_total} tasks</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </aside>

      <main className="content">
        <div className="dashGrid">
          <CreateBoardCard onClick={() => setIsCreateOpen(true)} />
          {boards.status === 'success' &&
            boards.data.map(board => (
              <DashboardBoardCard
                key={board.id}
                board={board}
                onOpen={selectedBoard => {
                  setActiveId(selectedBoard.id)
                }}
              />
            ))}
        </div>
      </main>

      <CreateBoardModal
        open={isCreateOpen}
        saving={isCreating}
        error={createError}
        onClose={handleCloseCreate}
        onCreate={handleCreateBoard}
      />
    </div>
  )
}
