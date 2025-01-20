import { useState, useEffect, useMemo } from 'react'
import { getWeekDates, getDayTimes, getCalendarData } from './../helpers/dateHelpers'
import TimeRow from './TimeRow'
import './Calendar.css'

function Calendar({ doctorId }) {
  const dayTimes = getDayTimes()
  const [currDate, setCurrDate] = useState(new Date())
  const [weekDates, setWeekDates] = useState(getWeekDates(new Date()))
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/api/schedule/appointments/${doctorId}`)
      .then(response => response.json())
      .then(data => {
        setAppointments(data)
      })
      .catch(error => {
        console.error('Can not fetch appointments: ', error)
      })
  }, [doctorId])

  const calendar = useMemo(() => getCalendarData(appointments, weekDates, dayTimes), [appointments, weekDates, dayTimes])

  function prev(event) {
    setCurrDate(new Date(currDate.setDate(currDate.getDate() - 7)))
    setWeekDates(getWeekDates(currDate))
  }

  function next(event) {
    setCurrDate(new Date(currDate.setDate(currDate.getDate() + 7)))
    setWeekDates(getWeekDates(currDate))
  }

  return (
    <>
      <div className='nav'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      <div className='container'>
        <table>
          <thead>
            <tr>
              <th></th>
              {weekDates.map((date, idx) => (
                <th key={idx}>{date}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dayTimes.map((time, index) => (
              <TimeRow key={time} time={time} weekDates={weekDates} calendar={calendar} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Calendar