require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');

const User = require('./models/userModel');
const Schedule = require('./models/scheduleModel');
const Appointment = require('./models/appointmentModel');
const ShoppingCart = require('./models/shoppingCartModel');
const ShoppingCartItem = require('./models/shoppingCartItemModel');
const Chat = require('./models/chatModel');
const ChatMessage = require('./models/chatMessageModel');

const app = express();

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.log(err));

sequelize.sync();

timeSlots = [
    {"date": "2025-01-08", "time": "10:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-11", "time": "13:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-09", "time": "17:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-07", "time": "16:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-09", "time": "14:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-07", "time": "09:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-11", "time": "15:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-07", "time": "17:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-12", "time": "10:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-07", "time": "17:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-07", "time": "12:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-11", "time": "14:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-11", "time": "13:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-07", "time": "16:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-06", "time": "13:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-12", "time": "10:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-11", "time": "13:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-09", "time": "14:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-11", "time": "15:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-07", "time": "15:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-01", "time": "08:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-01", "time": "12:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-01", "time": "14:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-02", "time": "10:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-02", "time": "13:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-02", "time": "16:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-03", "time": "09:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-03", "time": "11:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-03", "time": "14:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-04", "time": "08:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-04", "time": "12:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-04", "time": "15:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-05", "time": "09:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-05", "time": "13:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-05", "time": "17:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-06", "time": "10:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-06", "time": "11:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-06", "time": "15:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-07", "time": "08:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-07", "time": "12:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-07", "time": "16:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-08", "time": "09:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-08", "time": "13:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-08", "time": "17:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-09", "time": "10:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-09", "time": "11:00", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-09", "time": "15:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-10", "time": "08:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-10", "time": "12:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-10", "time": "16:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-11", "time": "09:00", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-11", "time": "13:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-11", "time": "17:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-12", "time": "10:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-12", "time": "12:00", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-12", "time": "14:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-13", "time": "08:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-13", "time": "11:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-13", "time": "16:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-14", "time": "09:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-14", "time": "13:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-14", "time": "17:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-15", "time": "10:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-15", "time": "12:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-15", "time": "15:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-16", "time": "08:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-16", "time": "11:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-16", "time": "16:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-17", "time": "09:00", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-17", "time": "13:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-17", "time": "17:00", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-18", "time": "10:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-18", "time": "12:00", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-18", "time": "14:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-19", "time": "08:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-19", "time": "11:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-19", "time": "16:00", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-20", "time": "09:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-20", "time": "13:30", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-20", "time": "17:30", "isReserved": false, "isCancelled": true},
    {"date": "2025-01-21", "time": "10:30", "isReserved": true, "isCancelled": true},
    {"date": "2025-01-21", "time": "12:30", "isReserved": false, "isCancelled": false},
    {"date": "2025-01-21", "time": "15:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-22", "time": "08:00", "isReserved": true, "isCancelled": false},
    {"date": "2025-01-22", "time": "11:30", "isReserved": false, "isCancelled": true},
  ]
  

// const corsOptions = {
//     origin: 'http://localhost:5174',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes)
app.use('/api/schedule', scheduleRoutes);

app.get('/api/timeSlots', (req, res) => {
    res.json(timeSlots);
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});