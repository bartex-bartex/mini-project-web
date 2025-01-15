const express = require('express');
const router = express.Router();
const { getAppointmentsByDoctorId } = require('../controllers/scheduleController');

router.get('/appointments/:doctorId', getAppointmentsByDoctorId);

module.exports = router;