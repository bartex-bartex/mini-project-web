import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// class TimeSlot {
//   constructor(date, time, isReserved, isCancelled) {
//     this.date = date
//     this.time = time
//     this.isReserved = isReserved
//     this.isCancelled = isCancelled
//   }
// }

function TimeSlotComponent({ timeSlot }) {

  let color;
  if (timeSlot.isCancelled) {
    color = 'red'
  } else if (timeSlot.date < new Date()) {
    color = 'gray'
  } else {
    color = 'green'
  }

  const style = {
    width: `100px`,
    height: `100px`,
    backgroundColor: color
  }

  return <div style={style}></div>
}

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

function Calendar({ timeSlots }) {

  const weekDates = getWeekDates() // 2025-01-09
  const dayTimes = getDayTimes()   // 02:00

  const [calendar, setCalendar] = useState(() => {
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
  });


  return (
    <div className='container'>
      <table>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {
            dayTimes.map((time, index) => {
              return (
                <tr key={index.toString()}>
                  {weekDates.map((date, _) => {
                    return (
                      <td
                        style={{
                          backgroundColor: (() => {
                            const timeSlot = calendar.get(date).get(time);  // Get the timeSlot object
                            let color;
                    
                            // Apply logic to set color based on timeSlot properties
                            if (timeSlot.isCancelled) {
                              color = 'red';
                            } else if (new Date(timeSlot.date) < new Date()) {
                              color = 'gray';  // If the time is in the past, set gray
                            } else if (Object.keys(timeSlot).length > 0) {
                              color = 'green';  // Otherwise, set green for future times
                            }
                    
                            return color;  // Return the chosen color
                          })()
                        }}
                      >
                        {calendar.get(date).get(time).date}
                      </td>
                      );
                    })}
                </tr>
              )
            })
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
    // <TimeSlotComponent timeSlot={timeSlots[5]} />
  )
}

export default App
