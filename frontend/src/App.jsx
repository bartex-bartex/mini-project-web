import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar'
import Dashboard from './pages/dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider } from './UserContext';
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
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/calendar" element={<Calendar timeSlots={timeSlots} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
