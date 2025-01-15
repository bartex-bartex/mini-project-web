import { useState, useEffect, useMemo } from 'react'
import { getWeekDates, getDayTimes, getCalendarData } from './../helpers/dateHelpers'
import TimeRow from './TimeRow'
import './Calendar.css'

function Calendar({ timeSlots }) {

    // let weekDates = getWeekDates(new Date()) // 2025-01-09
    const dayTimes = getDayTimes()   // 02:00
    const [currDate, setCurrDate] = useState(new Date())
    const [weekDates, setWeekDates] = useState(getWeekDates(new Date()))
    const calendar = useMemo(() => getCalendarData(timeSlots, weekDates, dayTimes), [timeSlots, weekDates, dayTimes]);
  
    function prev(event){
      setCurrDate(new Date(currDate.setDate(currDate.getDate() - 7)))
      setWeekDates(getWeekDates(currDate))
    }
  
    function next(event){
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
              {
                dayTimes.map((time, index) => (
                  <TimeRow key={time} time={time} weekDates={weekDates} calendar={calendar} />
                ))
              }
            </tbody>
          </table>
        </div>
      </>
    )
  }

  export default Calendar;