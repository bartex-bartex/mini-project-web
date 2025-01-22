import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useUser } from '../UserContext';

function Schedule() {
  const { id, username, role } = useUser();
  const location = useLocation();
  const doctorId = role === 'doctor' ? id : location.state?.doctorId;
  const doctorName = role === 'doctor' ? username : location.state?.doctorName;
  console.log("Schedule" + doctorId);

  return (
    <div>
      <h1>{doctorName}'s Schedule</h1>
      <Calendar doctorId={doctorId} />
    </div>
  );
}

export default Schedule;