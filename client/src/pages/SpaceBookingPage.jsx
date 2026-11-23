import { useState } from 'react'

function SpaceBookingPage() {
  const [space, setSpace] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (endTime <= startTime) {
      setMessage('End time must be later than start time.')
      return
    }

    setMessage(
      'Your booking details have been captured. Booking submission requires a backend booking endpoint.',
    )
  }

  return (
    <main className="booking-page">
      <h1>Book a Library Space</h1>
      <p>Select a space and choose your preferred booking time.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="space">Select Space</label>
        <select
          id="space"
          value={space}
          onChange={(event) => setSpace(event.target.value)}
          required
        >
          <option value="">Choose a space</option>
          <option value="Study Room 1">Study Room 1</option>
          <option value="Study Room 2">Study Room 2</option>
          <option value="Discussion Room">Discussion Room</option>
          <option value="Reading Hall">Reading Hall</option>
        </select>

        <label htmlFor="date">Booking Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />

        <label htmlFor="startTime">Start Time</label>
        <input
          id="startTime"
          type="time"
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          required
        />

        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="time"
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          required
        />

        <button type="submit">Submit Booking</button>
      </form>

      {message && <p role="status">{message}</p>}
    </main>
  )
}

export default SpaceBookingPage
