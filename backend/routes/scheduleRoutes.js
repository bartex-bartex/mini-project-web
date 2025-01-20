const express = require('express');
const { checkDoctor } = require('../middlewares/authMiddleware');
const router = express.Router();
const { getAppointmentsByDoctorId, addSingleDayAppointments: addSingleAppointments } = require('../controllers/scheduleController');

router.get('/appointments/:doctorId', getAppointmentsByDoctorId);
router.post('/single', checkDoctor, addSingleAppointments);

module.exports = router;