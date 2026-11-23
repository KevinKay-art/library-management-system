import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message || 'Registration failed',
        )
      }

      navigate('/login', {
        state: { registered: true },
      })
    } catch (error) {
      setMessage(error.message || 'Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <h1>Create an Account</h1>
      <p>Register for your library account.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && <p role="alert">{message}</p>}

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </main>
  )
}

export default RegisterPage
