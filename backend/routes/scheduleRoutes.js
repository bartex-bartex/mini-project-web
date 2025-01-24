const express = require('express');
const { checkDoctor, checkPatient } = require('../middlewares/authMiddleware');
const router = express.Router();
const { getAppointmentsByDoctorId, addSingleDayAppointments: addSingleAppointments, reserveAppointment, cancelAppointment, addRangeAppointments } = require('../controllers/scheduleController');

router.get('/appointments/:doctorId', getAppointmentsByDoctorId);
router.post('/single', checkDoctor, addSingleAppointments);
router.post('/cyclic', checkDoctor, addRangeAppointments);
router.post('/reserve', checkPatient, reserveAppointment);
router.post('/cancel', checkPatient, cancelAppointment);

module.exports = router;