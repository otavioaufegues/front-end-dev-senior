import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createTask,
  listTasks,
  statusKeys,
  updateTaskStatus,
  type CreateTaskPayload,
  type StatusKey,
  type Task,
} from '../services/api/tasks'

type State =
  | { status: 'loading'; data: Task[]; error: null }
  | { status: 'success'; data: Task[]; error: null }
  | { status: 'error'; data: Task[]; error: Error }

const statusNames: Record<StatusKey, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
}

function createOptimisticTask(boardId: number, payload: CreateTaskPayload): Task {
  const statusKey = payload.status_key ?? 'todo'
  const now = new Date().toISOString()

  return {
    id: -Date.now(),
    board_id: boardId,
    status: {
      id: 0,
      key: statusKey,
      name: statusNames[statusKey],
      position: statusKeys.indexOf(statusKey) + 1,
    },
    title: payload.title,
    description: payload.description ?? null,
    priority: payload.priority ?? 'normal',
    created_at: now,
    updated_at: now,
  }
}

function withTaskStatus(task: Task, statusKey: StatusKey): Task {
  return {
    ...task,
    status: {
      ...task.status,
      key: statusKey,
      name: statusNames[statusKey],
      position: statusKeys.indexOf(statusKey) + 1,
    },
    updated_at: new Date().toISOString(),
  }
}

export function useKanban(boardId: number) {
  const [state, setState] = useState<State>({
    status: 'loading',
    data: [],
    error: null,
  })

  const loadTasks = useCallback((options?: { keepData?: boolean }) => {
    let cancelled = false

    setState(current => ({
      status: 'loading',
      data: options?.keepData ? current.data : [],
      error: null,
    }))

    const request = listTasks(boardId)
      .then(data => {
        if (cancelled) return
        setState({ status: 'success', data, error: null })
      })
      .catch(err => {
        if (cancelled) return
        const error = err instanceof Error ? err : new Error('Failed to load tasks')
        setState({ status: 'error', data: [], error })
      })

    return {
      request,
      cancel: () => {
        cancelled = true
      },
    }
  }, [boardId])

  const columns = useMemo(
    () =>
      statusKeys.map(statusKey => ({
        key: statusKey,
        title: statusNames[statusKey],
        tasks: state.data.filter(task => task.status.key === statusKey),
      })),
    [state.data],
  )

  const addTask = useCallback(
    async (payload: CreateTaskPayload) => {
      const optimisticTask = createOptimisticTask(boardId, payload)
      const previousData = state.data

      setState({ status: 'success', data: [optimisticTask, ...previousData], error: null })

      try {
        await createTask(boardId, payload)
        await loadTasks({ keepData: true }).request
      } catch (error) {
        setState({
          status: 'error',
          data: previousData,
          error: error instanceof Error ? error : new Error('Failed to create task'),
        })
        throw error
      }
    },
    [boardId, loadTasks, state.data],
  )

  const moveTask = useCallback(
    async (task: Task, statusKey: StatusKey) => {
      if (task.status.key === statusKey) return

      const previousData = state.data
      setState({
        status: 'success',
        data: previousData.map(item => (item.id === task.id ? withTaskStatus(item, statusKey) : item)),
        error: null,
      })

      try {
        await updateTaskStatus(task.id, statusKey)
      } catch (error) {
        setState({
          status: 'error',
          data: previousData,
          error: error instanceof Error ? error : new Error('Failed to update task status'),
        })
        throw error
      }
    },
    [state.data],
  )

  useEffect(() => {
    const loader = loadTasks()

    return () => {
      loader.cancel()
    }
  }, [loadTasks])

  return { ...state, columns, addTask, moveTask, refetch: loadTasks }
}
