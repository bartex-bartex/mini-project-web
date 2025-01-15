const Appointment = require('../models/appointmentModel');
const Schedule = require('../models/scheduleModel');

exports.getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const appointments = await Appointment.findAll({
      include: [{
        model: Schedule,
        where: { doctorId }
      }]
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};