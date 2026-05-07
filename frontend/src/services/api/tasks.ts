import { getJson, patchJson, postJson } from '../axios/axios'

export const statusKeys = ['todo', 'in_progress', 'done'] as const

export type StatusKey = (typeof statusKeys)[number]

export type TaskStatus = {
  id: number
  key: StatusKey
  name: string
  position: number
}

export type Task = {
  id: number
  board_id: number
  status: TaskStatus
  title: string
  description: string | null
  priority: 'normal' | 'urgent'
  created_at: string
  updated_at: string
}

export type CreateTaskPayload = {
  title: string
  description?: string | null
  priority?: 'normal' | 'urgent'
  status_key?: StatusKey
}

type ListTasksResponse = { data: Task[] }
type CreateTaskResponse = { data: { id: number } }
type UpdateTaskStatusResponse = { data: true }

export async function listTasks(boardId: number): Promise<Task[]> {
  const payload = await getJson<ListTasksResponse>(`/boards/${boardId}/tasks`)

  return payload.data
}

export async function createTask(boardId: number, payload: CreateTaskPayload): Promise<number> {
  const response = await postJson<CreateTaskResponse, CreateTaskPayload>(
    `/boards/${boardId}/tasks`,
    payload,
  )

  return response.data.id
}

export async function updateTaskStatus(taskId: number, statusKey: StatusKey): Promise<void> {
  await patchJson<UpdateTaskStatusResponse, { status_key: StatusKey }>(`/tasks/${taskId}/status`, {
    status_key: statusKey,
  })
}
