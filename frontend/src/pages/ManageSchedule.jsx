import React, { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import './ManageSchedule.css';

function ManageSchedule() {
  const { token } = useUser();
  const [cyclicAvailability, setCyclicAvailability] = useState({
    startDate: '',
    endDate: '',
    days: [],
    times: [{ start: '', end: '' }],
  });
  const [singleAvailability, setSingleAvailability] = useState({
    date: '',
    times: [{ start: '', end: '' }],
  });
  const [absences, setAbsences] = useState([]);
  const [newAbsence, setNewAbsence] = useState('');

  const handleCyclicChange = (e) => {
    const { name, value } = e.target;
    setCyclicAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleChange = (e) => {
    const { name, value } = e.target;
    setSingleAvailability((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAbsence = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/absences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ date: newAbsence }),
    });

    if (response.ok) {
      setAbsences((prev) => [...prev, newAbsence]);
      setNewAbsence('');
    } else {
      const errorData = await response.json();
      console.error('Error adding absence:', errorData);
    }
  };

  const handleCyclicSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(cyclicAvailability));
    const response = await fetch('http://localhost:3001/api/schedule/cyclic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cyclicAvailability),
    });

    if (response.ok) {
      alert('Cyclic availability added successfully');
    } else {
      const errorData = await response.json();
      console.error('Error adding cyclic availability:', errorData);
    }
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/schedule/single', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(singleAvailability),
    });

    if (response.ok) {
      alert('Single availability added successfully');
    } else {
      const errorData = await response.json();
      console.error('Error adding single availability:', errorData);
    }
  };

  return (
    <div className="manage-schedule-container">
      <h1>Manage Schedule</h1>
      <div className="form-section">
        <h2>Define Cyclic Availability</h2>
        <form onSubmit={handleCyclicSubmit}>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={cyclicAvailability.startDate}
              onChange={handleCyclicChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={cyclicAvailability.endDate}
              onChange={handleCyclicChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Days</label>
            <div className="days-checkboxes">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="days"
                    value={day}
                    checked={cyclicAvailability.days.includes(day)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      setCyclicAvailability((prev) => ({
                        ...prev,
                        days: checked
                          ? [...prev.days, value]
                          : prev.days.filter((d) => d !== value),
                      }));
                    }}
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Times</label>
            {cyclicAvailability.times.map((time, index) => (
              <div key={index} className="time-range">
                <input
                  type="time"
                  name="start"
                  value={time.start}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setCyclicAvailability((prev) => {
                      const times = [...prev.times];
                      times[index][name] = value;
                      return { ...prev, times };
                    });
                  }}
                  required
                />
                <input
                  type="time"
                  name="end"
                  value={time.end}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setCyclicAvailability((prev) => {
                      const times = [...prev.times];
                      times[index][name] = value;
                      return { ...prev, times };
                    });
                  }}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCyclicAvailability((prev) => ({
                        ...prev,
                        times: prev.times.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setCyclicAvailability((prev) => ({
                  ...prev,
                  times: [...prev.times, { start: '', end: '' }],
                }));
              }}
            >
              Add Time Range
            </button>
          </div>
          <button type="submit">Save Cyclic Availability</button>
        </form>
      </div>

      <div className="form-section">
        <h2>Define Single Availability</h2>
        <form onSubmit={handleSingleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={singleAvailability.date}
              onChange={handleSingleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Times</label>
            {singleAvailability.times.map((time, index) => (
              <div key={index} className="time-range">
                <input
                  type="time"
                  name="start"
                  value={time.start}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setSingleAvailability((prev) => {
                      const times = [...prev.times];
                      times[index][name] = value;
                      return { ...prev, times };
                    });
                  }}
                  required
                />
                <input
                  type="time"
                  name="end"
                  value={time.end}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setSingleAvailability((prev) => {
                      const times = [...prev.times];
                      times[index][name] = value;
                      return { ...prev, times };
                    });
                  }}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSingleAvailability((prev) => ({
                        ...prev,
                        times: prev.times.filter((_, i) => i !== index),
                      }));
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setSingleAvailability((prev) => ({
                  ...prev,
                  times: [...prev.times, { start: '', end: '' }],
                }));
              }}
            >
              Add Time Range
            </button>
          </div>
          <button type="submit">Save Single Availability</button>
        </form>
      </div>

      <div className="form-section">
        <h2>Add Absence</h2>
        <form onSubmit={handleAddAbsence}>
          <div className="form-group">
            <label htmlFor="absenceDate">Date</label>
            <input
              type="date"
              id="absenceDate"
              name="absenceDate"
              value={newAbsence}
              onChange={(e) => setNewAbsence(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Absence</button>
        </form>
        <ul>
          {absences.map((absence, index) => (
            <li key={index}>{absence}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageSchedule;