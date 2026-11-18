
import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <input
      type="text"
      placeholder="Search books by title or author..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBar
