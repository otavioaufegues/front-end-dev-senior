import { useEffect, useState } from 'react'

export default function App() {

  const [users, setUsers] = useState<{ id: number; name: string; role: string }[]>([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/mock-data`)
      .then(res => res.json())
      .then(payload => setUsers(payload.data))
      .catch(err => console.error("Erro ao conectar na API:", err))
  }, [])

  return (
    <div>
      <h1>Frontend React</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} — {u.role}</li>
        ))}
      </ul>
    </div>
  )
}