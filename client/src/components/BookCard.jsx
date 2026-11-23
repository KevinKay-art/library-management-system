import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function BookCard({ book }) {
  const { readingList, addBook } = useReadingList()

  const isAdded = readingList.some(
    (savedBook) => savedBook.id === book.id,
  )

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>
      <p>ISBN: {book.isbn}</p>

      <Link to={`/books/${book.id}`}>
        View Details
      </Link>

      <button
        type="button"
        onClick={() => addBook(book)}
        disabled={isAdded}
      >
        {isAdded ? 'Added to Reading List' : 'Add to Reading List'}
      </button>
    </div>
  )
}

export default BookCard
