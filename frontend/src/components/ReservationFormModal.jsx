import React from 'react';

function ReservationFormModal({ show, onClose, onSubmit, formData, handleChange }) {
  if (!show) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onClose}>&times;</span>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Visit Type:</label>
            <select name="visitType" value={formData.visitType} onChange={handleChange} required>
              <option value="initial">Initial</option>
              <option value="follow-up">Follow-up</option>
              <option value="chronic">Chronic</option>
              <option value="prescription">Prescription</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Patient Name:</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Patient Gender:</label>
            <select name="patientGender" value={formData.patientGender} onChange={handleChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Patient Age:</label>
            <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} required />
          </div>
          <div className='form-group'>
            <label>Doctor Notes:</label>
            <textarea name="doctorNotes" value={formData.doctorNotes} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationFormModal;