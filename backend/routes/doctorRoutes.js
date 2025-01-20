const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middlewares/authMiddleware');
const { getDoctors, addDoctor, removeDoctor } = require('../controllers/doctorController');

router.get('/', getDoctors);
router.post('/', checkAdmin, addDoctor);
router.delete('/:id', checkAdmin, removeDoctor);

module.exports = router;