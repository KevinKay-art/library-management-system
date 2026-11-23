import { createContext, useContext, useEffect, useReducer } from 'react'

const ReadingListContext = createContext(null)

const STORAGE_KEY = 'readingList'

function loadReadingList() {
  try {
    const savedList = localStorage.getItem(STORAGE_KEY)
    return savedList ? JSON.parse(savedList) : []
  } catch {
    return []
  }
}

export function readingListReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOK':
      if (state.some((book) => book.id === action.payload.id)) {
        return state
      }
      return [...state, action.payload]

    case 'REMOVE_BOOK':
      return state.filter((book) => book.id !== action.payload)

    case 'CLEAR_LIST':
      return []

    default:
      return state
  }
}

export function ReadingListProvider({ children }) {
  const [readingList, dispatch] = useReducer(
    readingListReducer,
    undefined,
    loadReadingList,
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList))
  }, [readingList])

  const addBook = (book) => {
    dispatch({ type: 'ADD_BOOK', payload: book })
  }

  const removeBook = (bookId) => {
    dispatch({ type: 'REMOVE_BOOK', payload: bookId })
  }

  const clearList = () => {
    dispatch({ type: 'CLEAR_LIST' })
  }

  return (
    <ReadingListContext.Provider
      value={{ readingList, addBook, removeBook, clearList }}
    >
      {children}
    </ReadingListContext.Provider>
  )
}

export function useReadingList() {
  const context = useContext(ReadingListContext)

  if (!context) {
    throw new Error(
      'useReadingList must be used inside ReadingListProvider',
    )
  }

  return context
}
