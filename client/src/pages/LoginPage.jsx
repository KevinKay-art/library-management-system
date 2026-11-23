import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

function LoginPage() {
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
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message || 'Login failed',
        )
      }

      if (!data.access_token) {
        throw new Error('Login response did not include an access token')
      }

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.user))

      navigate('/')
    } catch (error) {
      setMessage(error.message || 'Unable to connect to the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <h1>Login</h1>
      <p>Sign in to your library account.</p>

      <form onSubmit={handleSubmit}>
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
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && <p role="alert">{message}</p>}

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </main>
  )
}

export default LoginPage
