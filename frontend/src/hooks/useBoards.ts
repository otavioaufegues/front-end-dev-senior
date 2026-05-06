import { useEffect, useState } from 'react'
import type { Board } from '../api/boards'
import { listBoards } from '../api/boards'

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

  useEffect(() => {
    let cancelled = false

    listBoards()
      .then(data => {
        if (cancelled) return
        setState({ status: 'success', data, error: null })
      })
      .catch(err => {
        if (cancelled) return
        const error = err instanceof Error ? err : new Error('Failed to load boards')
        setState({ status: 'error', data: [], error })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}

