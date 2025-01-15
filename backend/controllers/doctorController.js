const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({ where: { role: 'doctor' } });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addDoctor = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const doctor = await User.create({
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      role: 'doctor',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    await doctor.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};