
import { useEffect, useState } from 'react'
import BookCard from './BookCard'

function BookGrid({ genreId, search }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchBooks() {
      try {
        setLoading(true)
        setError('')

        const params = new URLSearchParams()

        if (genreId) params.append('genreId', genreId)
        if (search) params.append('search', search)

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books?${params.toString()}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }

        const result = await response.json()
        setBooks(result.data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchBooks()

    return () => controller.abort()
  }, [genreId, search])

  const sortedBooks = [...books].sort((a, b) =>
    (a[sortBy] || '').localeCompare(b[sortBy] || '')
  )

  if (loading) {
    return (
      <div className="book-grid">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="book-skeleton" key={item}>
            <div className="skeleton-title"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) return <p>Error: {error}</p>
  if (books.length === 0) return <p>No books found.</p>

  return (
    <div>
      <label htmlFor="sort-books">Sort books by: </label>
      <select
        id="sort-books"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="title">Title (A-Z)</option>
        <option value="author">Author (A-Z)</option>
      </select>

      <div className="book-grid">
        {sortedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default BookGrid
