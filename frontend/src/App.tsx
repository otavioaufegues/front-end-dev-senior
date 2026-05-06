import { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Usando a variável de ambiente que definimos no docker-compose
    fetch(`${import.meta.env.VITE_API_URL}/user`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Erro ao conectar na API:", err))
  }, [])

  return (
    <div>
      <h1>Frontend React</h1>
      <p>Dados da API: {message || 'Carregando...'}</p>
    </div>
  )
}