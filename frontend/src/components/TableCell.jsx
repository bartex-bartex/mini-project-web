import { useState, useEffect, useMemo } from 'react'
import { getWeekDates, getDayTimes, getCalendarData } from './../helpers/dateHelpers'
import { useUser } from '../UserContext';
import ReservationFormModal from './ReservationFormModal'

//timeSlot object
// id	"8c56d212-8f98-4fb4-9104-d9dee7034ab8"
// scheduleId	"93b78fff-d91f-4db2-afc5-06950b6a4774"
// patientId	null
// date	"2025-01-23"
// time	"08:30"
// slots	1
// visitType	"initial"
// status	"available"
// patientName	""
// patientGender	"other"
// patientAge	0
// doctorNotes	""
// createdAt	"2025-01-20T23:07:25.660Z"
// updatedAt	"2025-01-20T23:07:25.660Z"

function TableCell({ timeSlot, time, date}) {
  const { id, role, token } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [formData, setFormData] = useState({
    visitType: 'initial',
    patientName: '',
    patientGender: 'other',
    patientAge: 0,
    doctorNotes: '',
    slots: 1
  });

  const getTooltipText = () => {
    if (role === 'doctor' && timeSlot.status === 'reserved') {
      return (
        <>
          <p>Visit Type: {timeSlot.visitType}</p>
          <p>Status: {timeSlot.status}</p>
          <p>Patient Name: {timeSlot.patientName}</p>
          <p>Patient Gender: {timeSlot.patientGender}</p>
          <p>Patient Age: {timeSlot.patientAge}</p>
          <p>Doctor Notes: {timeSlot.doctorNotes}</p>
        </>
      );
    } else {
      return <p>Time: {time}</p>;
    }
  };

  const getBackgroundColor = () => {
    let color;

    if (new Date(timeSlot.date) < new Date()) {
      color = 'gray';
    } else if (timeSlot.status === 'reserved') {
      if (role === 'doctor') {
        if (timeSlot.visitType === 'initial') {
          color = 'lightblue';
        } else if (timeSlot.visitType === 'follow-up') {
          color = 'lightgreen';
        } else if (timeSlot.visitType === 'chronic') {
          color = 'lightyellow';
        } else if (timeSlot.visitType === 'prescription') {
          color = 'lightpink';
        }
      } else if (role === 'pacjent') {
        color = 'red';
      }
    } else if (timeSlot.status === 'cancelled') { 
      color = 'red';
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
      if (cell_time.getHours() === now.getHours() && ((now.getMinutes() >= 30 && cell_time.getMinutes() >= 30) || (now.getMinutes() < 30 && cell_time.getMinutes() < 30))) {
        color = 'lightblue';
      } else {
        color = 'yellow';
      }
    }

    return color
  }

  function onClick(event) {

    if (Object.keys(timeSlot).length === 0 || (timeSlot.status === 'reserved' && timeSlot.patientId !== id) || (new Date(timeSlot.date).setHours(timeSlot.time.split(':')[0]) < new Date() && new Date)) {
      return;
    }

    if (role === 'pacjent'){  
      if (timeSlot.status === 'reserved' && timeSlot.patientId === id) {
        setShowCancelForm(true);
      } else if (timeSlot.status === 'cancelled') {
        return;
      } else {
        setShowForm(true);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(id)

    e.preventDefault();
    const completeFormData = {
      ...formData,
      id: timeSlot.id,
      scheduleId: timeSlot.scheduleId,
      patientId: id,
      date: timeSlot.date,
      time: timeSlot.time,
    };

    fetch('http://localhost:3001/api/schedule/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(completeFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setShowForm(false);
  };

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    // Handle cancel reservation logic here
    fetch('http://localhost:3001/api/schedule/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id: timeSlot.id, patientId: id })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Reservation cancelled for:', timeSlot.id);
        setShowCancelForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setShowCancelForm(false);
  };

  return (
    <>
      <td className='tooltip-trigger' style={{ backgroundColor: getBackgroundColor(), borderColor: getBorderColor()}} onClick={onClick}>
        {timeSlot.date || '--'}
        <div className='tooltip'>
          {getTooltipText()}
        </div>
      </td>
      {showForm && (
        <ReservationFormModal
          show={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
        />
      )}
      {showCancelForm && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setShowCancelForm(false)}>&times;</span>
            <form onSubmit={handleCancelSubmit}>
              <p>Are you sure you want to cancel this reservation?</p>
              <button type="submit">Yes, Cancel</button>
              <button type="button" onClick={() => setShowCancelForm(false)}>No, Keep</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TableCell;