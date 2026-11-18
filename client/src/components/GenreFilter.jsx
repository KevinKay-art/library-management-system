
import { useEffect, useState } from 'react'

function GenreFilter({ onGenreChange }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/genres`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch genres')
        }

        const data = await response.json()
        setGenres(data)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }

    fetchGenres()
  }, [])

  return (
    <select onChange={(e) => onGenreChange(e.target.value)}>
      <option value="">All Genres</option>

      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  )
}

export default GenreFilter
