import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar';
import { useUser } from '../UserContext';

function Schedule() {
  const { id, role } = useUser();
  const { doctorId: paramDoctorId } = useParams();
  const doctorId = role === 'doctor' ? id : paramDoctorId;

  return (
    <div>
      <h1>Doctor's Schedule</h1>
      <Calendar doctorId={doctorId} />
    </div>
  );
}

export default Schedule;