import { useState, useEffect, useMemo } from 'react'
import Calendar from './components/Calendar'
import './App.css'

function App() {
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/api/timeSlots")
      .then(response => response.json())
      .then(data => {
        setTimeSlots(data)
      })
      .catch(error => {
        console.error('Can not fetch time slots: ', error)
      })
  }, [])

  if (timeSlots.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Calendar timeSlots={timeSlots} />
  )
}

export default App
