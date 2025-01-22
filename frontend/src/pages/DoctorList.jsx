import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import './DoctorList.css';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ username: '', email: '', password: '' });
  const { token, role } = useUser();

  useEffect(() => {
    fetch("http://localhost:3001/api/doctors")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDoctors(data);
      })
      .catch(error => {
        console.error('Can not fetch doctors: ', error);
      });
  }, [token]);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newDoctor)
    });

    if (response.ok) {
      const addedDoctor = await response.json();
      setNewDoctor({ username: '', email: '', password: '' });
      setDoctors((prevDoctors) => [...prevDoctors, addedDoctor]);
    } else {
      const errorData = await response.json();
      console.error('Error adding doctor:', errorData);
    }
  };

  const handleRemoveDoctor = async (doctorId) => {
    const response = await fetch(`http://localhost:3001/api/doctors/${doctorId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    } else {
      const errorData = await response.json();
      console.error('Error removing doctor:', errorData);
    }
  };

  return (
    <div className="doctor-list-container">
      <h1>Doctor List</h1>
      {role === 'admin' && (
        <form onSubmit={handleAddDoctor}>
          <input
            type="text"
            placeholder="Username"
            value={newDoctor.username}
            onChange={(e) => setNewDoctor({ ...newDoctor, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
            required
          />
          <button type="submit">Add Doctor</button>
        </form>
      )}
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>
            {doctor.username} ({doctor.email})
            {role === 'admin' && (
              <button onClick={() => handleRemoveDoctor(doctor.id)}>Remove</button>
            )}
            {role === 'pacjent' && (
              <Link to="/schedule" state={{doctorId: doctor.id, doctorName: doctor.username}}>View Schedule</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;