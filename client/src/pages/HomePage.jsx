
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import BookGrid from '../components/BookGrid'
import GenreFilter from '../components/GenreFilter'

function HomePage() {
  const [search, setSearch] = useState('')
  const [genreId, setGenreId] = useState('')

  return (
    <div>
      <h1>Library Management System</h1>
      <p>Discover and explore our book collection.</p>

      <SearchBar onSearch={setSearch} />

      <GenreFilter onGenreChange={setGenreId} />

      <BookGrid search={search} genreId={genreId} />
    </div>
  )
}

export default HomePage
