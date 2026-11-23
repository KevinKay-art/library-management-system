
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch book details')
        }

        const data = await response.json()
        setBook(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <p>Loading book details...</p>
  if (error) return <p>Error: {error}</p>
  if (!book) return <p>Book not found.</p>

  return (
    <div className="book-detail">
      <Link to="/">Back to Books</Link>

      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>
      <p>Published Year: {book.publishedYear}</p>
      <p>Total Copies: {book.totalCopies}</p>
      <p>Available Copies: {book.availableCopies}</p>
    </div>
  )
}

export default BookDetail
