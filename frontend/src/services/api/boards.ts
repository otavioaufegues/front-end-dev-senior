import { getJson } from '../axios/axios'

export type BoardStats = {
  todo: number
  in_progress: number
  done: number
}

export type Board = {
  id: number
  name: string
  description: string | null
  theme_color: string
  icon: string
  last_activity_at: string | null
  tasks_count_total: number
  tasks_count_by_status: BoardStats
}

type ListBoardsResponse = { data: Board[] }

export async function listBoards(): Promise<Board[]> {
  const payload = await getJson<ListBoardsResponse>('/boards')
  
  return payload.data
}

