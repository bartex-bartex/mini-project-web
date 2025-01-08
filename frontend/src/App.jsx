import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getWeekDates(today) {
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

function TableCell({ timeSlot, time, date}) {
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

  const getBorderColor = () => {
    let color;
    const now = new Date();
    const cell = new Date(date);
    const cell2 = new Date()
    cell2.setHours(time.split(':')[0], time.split(':')[1])

    if (cell.getFullYear() === now.getFullYear() && cell.getMonth() === now.getMonth() && cell.getDate() === now.getDate()) {
      if (cell2.getHours() === now.getHours() && now.getMinutes() - cell2.getMinutes() < 30) {
        color = 'lightblue';
      } else {
        color = 'yellow';
      }
    }

    return color
  }

  function onClick(event) {
    // TODO: redirection to the reservation page
    alert('clicked')
  }

  return (
    <>
      <td className='tooltip-trigger' style={{ backgroundColor: getBackgroundColor(), borderColor: getBorderColor()}} onClick={onClick}>
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
        return <TableCell timeSlot={timeSlot} time={time} date={date} />;
      })}
    </tr>
  );
}

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
