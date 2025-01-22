import { useState, useEffect, useMemo } from 'react'
import { getWeekDates, getDayTimes, getCalendarData } from './../helpers/dateHelpers'

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
    const cell_date = new Date(date);
    const cell_time = new Date()
    cell_time.setHours(time.split(':')[0], time.split(':')[1])

    
    if (cell_date.getFullYear() === now.getFullYear() && cell_date.getMonth() === now.getMonth() && cell_date.getDate() === now.getDate()) {
      console.log(cell_date)
      console.log(cell_time)
      if (cell_time.getHours() === now.getHours() && ((now.getMinutes() >= 30 && cell_time.getMinutes() >= 30) || (now.getMinutes() < 30 && cell_time.getMinutes() < 30))) {
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

export default TableCell;