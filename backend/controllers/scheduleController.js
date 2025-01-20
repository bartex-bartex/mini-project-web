const { addThirtyMinutes, closestPreviousThirtyMinutes, closestNextThirtyMinutes } = require('../utils/dateHelper');
const { v4: uuidv4 } = require('uuid');

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