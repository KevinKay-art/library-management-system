
import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>
      <p>ISBN: {book.isbn}</p>

      <Link to={`/books/${book.id}`}>
        View Details
      </Link>
    </div>
  )
}

export default BookCard
