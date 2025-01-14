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

export default TableCell;