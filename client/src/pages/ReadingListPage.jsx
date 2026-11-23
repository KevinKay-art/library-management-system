
import { useReadingList } from '../context/ReadingListContext'

function ReadingListPage() {
  const { readingList, removeBook, clearList } = useReadingList()

  return (
    <main className="reading-list-page">
      <h1>My Reading List</h1>

      {readingList.length === 0 ? (
        <p>Your reading list is empty. Add some books!</p>
      ) : (
        <>
          <p>You have {readingList.length} saved books.</p>

          <button type="button" onClick={clearList}>
            Clear Reading List
          </button>

          <div className="book-grid">
            {readingList.map((book) => (
              <div className="book-card" key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>

                <button
                  type="button"
                  onClick={() => removeBook(book.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default ReadingListPage
