const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middlewares/authMiddleware');
const { getDoctors, addDoctor, removeDoctor } = require('../controllers/doctorController');

router.get('/doctors', getDoctors);
router.post('/doctors', checkAdmin, addDoctor);
router.delete('/doctors/:id', checkAdmin, removeDoctor);

module.exports = router;