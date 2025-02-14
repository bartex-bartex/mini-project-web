import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar'
import Dashboard from './pages/dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import HeaderBar from './components/HeaderBar';
import DoctorList from './pages/DoctorList';
import { UserProvider } from './UserContext';
import './App.css'
import ManageSchedule from './pages/ManageSchedule';
import Schedule from './pages/Schedule';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // const [timeSlots, setTimeSlots] = useState([])

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/timeSlots")
  //     .then(response => response.json())
  //     .then(data => {
  //       setTimeSlots(data)
  //     })
  //     .catch(error => {
  //       console.error('Can not fetch time slots: ', error)
  //     })
  // }, [])

  // if (timeSlots.length === 0) {
  //   return <div>Loading...</div>
  // }

  return (
<UserProvider>
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctorlist" element={<DoctorList />} />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manageschedule"
            element={
              <ProtectedRoute requiredRole="doctor">
                <ManageSchedule />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
