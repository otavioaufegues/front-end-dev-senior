import { useCallback, useEffect, useState } from 'react'
import type { Board, CreateBoardPayload } from '../services/api/boards'
import { createBoard, listBoards } from '../services/api/boards'

type State =
  | { status: 'loading'; data: Board[]; error: null }
  | { status: 'success'; data: Board[]; error: null }
  | { status: 'error'; data: Board[]; error: Error }

export function useBoards() {
  const [state, setState] = useState<State>({
    status: 'loading',
    data: [],
    error: null,
  })

  const loadBoards = useCallback((options?: { keepData?: boolean }) => {
    let cancelled = false

    setState(current => ({
      status: 'loading',
      data: options?.keepData ? current.data : [],
      error: null,
    }))

    const request = listBoards()
      .then(data => {
        if (cancelled) return
        setState({ status: 'success', data, error: null })
      })
      .catch(err => {
        if (cancelled) return
        const error = err instanceof Error ? err : new Error('Failed to load boards')
        setState({ status: 'error', data: [], error })
      })

    return {
      request,
      cancel: () => {
        cancelled = true
      },
    }
  }, [])

  const addBoard = useCallback(
    async (payload: CreateBoardPayload) => {
      await createBoard(payload)
      await loadBoards({ keepData: true }).request
    },
    [loadBoards],
  )

  useEffect(() => {
    const loader = loadBoards()

    return () => {
      loader.cancel()
    }
  }, [loadBoards])

  return { ...state, createBoard: addBoard, refetch: loadBoards }
}
