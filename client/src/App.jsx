
import { Routes, Route } from 'react-router-dom'
import { ReadingListProvider } from './context/ReadingListContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import BookDetail from './pages/BookDetail'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SpaceBookingPage from './pages/SpaceBookingPage'
import ReadingListPage from './pages/ReadingListPage'

function App() {
  return (
    <ReadingListProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reading-list" element={<ReadingListPage />} />

        <Route
          path="/spaces/book"
          element={
            <ProtectedRoute>
              <SpaceBookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ReadingListProvider>
  )
}

export default App
