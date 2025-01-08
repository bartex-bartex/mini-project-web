import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getWeekDates() {
  const today = new Date();
  const day = today.getDay()
  const date = today.getDate() - day

  let monday = new Date(today.setDate(date))
  let weekDates = []
  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(monday.setDate(monday.getDate() + 1)))
  }

  weekDates = weekDates.map(date => date.toISOString().split('T')[0])

  return weekDates
}

function getDayTimes() {
  let time = new Date();
  time.setHours(0, 0);

  let dayTimes = []
  for (let i = 0; i < 48; i++) {
    dayTimes.push(time)
    time = new Date(time.getTime() + 30 * 60000)
  }

  dayTimes = dayTimes.map(time => time.toTimeString().split(' ')[0].slice(0, -3))

  return dayTimes
}

function getCalendarData(timeSlots, weekDates, dayTimes) {
  const calendar1 = new Map();

  for (let i = 0; i < 7; i++) {
    const dayMap = new Map();

    for (let j = 0; j < 48; j++) {
      const res = timeSlots.filter(timeSlot => timeSlot.date === weekDates[i] && timeSlot.time === dayTimes[j]);

      if (res.length > 0) {
        dayMap.set(dayTimes[j], res[0]);
      } else {
        dayMap.set(dayTimes[j], {});
      }
    }

    calendar1.set(weekDates[i], dayMap);
  }

  return calendar1;
}

function TableCell({ key, timeSlot, date, time }) {
  const getBackgroundColor = () => {
    let color;

    if (timeSlot.isCancelled) {
      color = 'red';
    } else if (new Date(timeSlot.date) < new Date()) {
      color = 'gray';
    } else if (Object.keys(timeSlot).length > 0) {
      color = 'green';
    }

    return color;
  };

  function onHover(event) {

  }

  function onClick(event) {
    // TODO: redirection to the reservation page
    alert('clicked')
  }

  return (
    <>
      <td className='tooltip-trigger' key={key} style={{ backgroundColor: getBackgroundColor() }} onClick={onClick}>
        {timeSlot.date || '--'}
        <div className='tooltip'>
          <p>Time: {time}</p>
        </div>
      </td>
    </>
  );
}

function TimeRow({ time, weekDates, calendar }) {
  return (
    <tr>
      <td>{time}</td>
      {weekDates.map(date => {
        const timeSlot = calendar.get(date)?.get(time) || {};
        return <TableCell key={date} timeSlot={timeSlot} date={date} time={time} />;
      })}
    </tr>
  );
}

function Calendar({ timeSlots }) {

  const weekDates = getWeekDates() // 2025-01-09
  const dayTimes = getDayTimes()   // 02:00

  const calendar = useMemo(() => getCalendarData(timeSlots, weekDates, dayTimes), [timeSlots, weekDates, dayTimes]);

  return (
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
  )
}


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
