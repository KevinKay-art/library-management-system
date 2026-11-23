
import { Link } from 'react-router-dom'
import { useReadingList } from '../context/ReadingListContext'

function Navbar() {
  const { readingList } = useReadingList()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Library Management System
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        <Link to="/reading-list">
          Reading List: {readingList.length}
        </Link>

        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/spaces/book">Book a Space</Link>
      </div>
    </nav>
  )
}

export default Navbar
