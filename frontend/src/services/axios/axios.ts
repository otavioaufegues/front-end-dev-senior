import axios, { AxiosError } from 'axios'

export type ApiError = Error & {
  status?: number
  details?: unknown
}

function toApiError(err: unknown): ApiError {
  if (!axios.isAxiosError(err)) return err instanceof Error ? (err as ApiError) : (new Error(String(err)) as ApiError)

  const axErr = err as AxiosError
  const apiErr = new Error(axErr.message) as ApiError
  apiErr.status = axErr.response?.status
  apiErr.details = axErr.response?.data
  return apiErr
}

const baseURL = import.meta.env.VITE_API_URL as string | undefined

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  res => res,
  err => Promise.reject(toApiError(err)),
)

export async function getJson<T>(url: string, config?: Parameters<typeof api.get>[1]): Promise<T> {
  const res = await api.get<T>(url, config)
  return res.data
}

export async function postJson<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: Parameters<typeof api.post>[2],
): Promise<TResponse> {
  const res = await api.post<TResponse>(url, body, config)
  return res.data
}

export async function patchJson<TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: Parameters<typeof api.patch>[2],
): Promise<TResponse> {
  const res = await api.patch<TResponse>(url, body, config)
  return res.data
}
