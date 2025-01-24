const { addThirtyMinutes, closestPreviousThirtyMinutes, closestNextThirtyMinutes } = require('../utils/dateHelper');
const { v4: uuidv4 } = require('uuid');
const AppointmentDTO = require('../DTOs/AppointmentDTO')

const Appointment = require('../models/appointmentModel');
const Schedule = require('../models/scheduleModel');

exports.getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const schedule = await Schedule.findOne({ where: { doctorId: doctorId } });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const appointments = await Appointment.findAll({
      where: { scheduleId: schedule.id }
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSingleDayAppointments = async (req, res) => {
  const { date, times } = req.body;
  const doctorId = req.user.id;

  console.log("addSingleDayAppointments: " + doctorId);

  try {
    const schedule = await Schedule.findOne({ where: { doctorId: doctorId } });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    let slotsCount = 0

    const appointments = await Promise.all(times.map(async (time) => {
      let currentTime = closestNextThirtyMinutes(time.start);
      let endTime = closestPreviousThirtyMinutes(time.end);
      const createdAppointments = [];

      while (addThirtyMinutes(currentTime) <= endTime) {
        const appointment = await Appointment.create({
          scheduleId: schedule.id,
          id: uuidv4(),
          date,
          time: currentTime,
          slots: 1,
          visitType: 'initial',
          status: 'available',
          patientName: '',
          patientGender: 'other',
          patientAge: 0,
          doctorNotes: ''
        });

        createdAppointments.push(appointment);
        slotsCount++;
        currentTime = addThirtyMinutes(currentTime);
      }

      return createdAppointments;
    }));

    res.status(201).json({slotsCount, appointments});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reserveAppointment = async (req, res) => {
  appointmentDTO = AppointmentDTO.fromRequestBody(req.body)

  // Validate the appointment data
  if (!appointmentDTO.patientName || !appointmentDTO.patientGender || !appointmentDTO.patientAge || !appointmentDTO.visitType) {
    return res.status(400).json({ message: 'Invalid appointment data' });
  }

  try {
    // Find the appointment by ID
    console.log(req.patientId)
    console.log(appointmentDTO.patientId)

    let appointment = await Appointment.findByPk(appointmentDTO.id);

    if (!appointment || appointment.status !== 'available') {
      // If the appointment does not exist, create a new one
      res.status(500).json({ error: 'Timeslot is not available'});
    } else {
      // If the appointment exists, update it
      appointment.patientName = appointmentDTO.patientName;
      appointment.patientGender = appointmentDTO.patientGender;
      appointment.patientAge = appointmentDTO.patientAge;
      appointment.visitType = appointmentDTO.visitType;
      appointment.doctorNotes = appointmentDTO.doctorNotes;
      appointment.slots = 1;
      appointment.status = 'reserved';
      appointment.patientId = appointmentDTO.patientId;

      await appointment.save();
    
      res.status(200).json(appointment);
    
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.cancelAppointment = async (req, res) => {
  const { id, patientId } = req.body;

  try {
    // Find the appointment by primary key (id)
    let appointment = await Appointment.findOne({ where: { id: id, patientId: patientId } });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the appointment status to 'cancelled' and clear patient information
    appointment.status = 'available';
    appointment.patientName = '';
    appointment.patientGender = 'other';
    appointment.patientAge = null;
    appointment.doctorNotes = '';
    appointment.patientId = null;

    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRangeAppointments = async (req, res) => {
  console.log('receive query')

  const { startDate, endDate, times, days } = req.body;
  const doctorId = req.user.id;

  console.log("addRangeAppointments: " + doctorId);

  const dayOfWeekMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };

  try {
    const schedule = await Schedule.findOne({ where: { doctorId: doctorId } });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    let slotsCount = 0;
    const createdAppointments = [];

    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      if (days.includes(Object.keys(dayOfWeekMap).find(key => dayOfWeekMap[key] === currentDate.getDay()))) {
        const dateStr = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        const dayAppointments = await Promise.all(times.map(async (time) => {
          let currentTime = closestNextThirtyMinutes(time.start);
          let endTime = closestPreviousThirtyMinutes(time.end);

          while (addThirtyMinutes(currentTime) <= endTime) {
            const appointment = await Appointment.create({
              scheduleId: schedule.id,
              id: uuidv4(),
              date: dateStr,
              time: currentTime,
              slots: 1,
              visitType: 'initial',
              status: 'available',
              patientName: '',
              patientGender: 'other',
              patientAge: 0,
              doctorNotes: ''
            });

            createdAppointments.push(appointment);
            slotsCount++;
            currentTime = addThirtyMinutes(currentTime);
          }
        }));
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.status(201).json({ slotsCount, appointments: createdAppointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAbsence = async (req, res) => {
  const { date } = req.body;
  const doctorId = req.user.id;

  try {
    const schedule = await Schedule.findOne({ where: { doctorId: doctorId } });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const appointments = await Appointment.findAll({
      where: { scheduleId: schedule.id, date: date }
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for the given date' });
    }

    await Promise.all(appointments.map(async (appointment) => {
      appointment.status = 'cancelled';
      await appointment.save();
    }));

    res.status(200).json({ message: 'Appointments marked as cancelled', appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};