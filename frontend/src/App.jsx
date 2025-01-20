import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Calendar from './components/Calendar'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import HeaderBar from './components/HeaderBar'
import DoctorList from './pages/DoctorList'
import { UserProvider } from './UserContext'
import './App.css'
import ManageSchedule from './pages/ManageSchedule'
import Schedule from './pages/Schedule' // Import the new Schedule page

function App() {

  return (
    <UserProvider>
      <Router>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctorlist" element={<DoctorList />} />
          <Route path="/manageschedule" element={<ManageSchedule />} />
          <Route path="/schedule/:doctorId" element={<Schedule />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App