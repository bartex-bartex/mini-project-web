const express = require('express');
const cors = require('cors');
const app = express();

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
    {"date": "2025-01-07", "time": "15:00", "isReserved": false, "isCancelled": true}
  ]
  

const corsOptions = {
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors());

app.get('/api/timeSlots', (req, res) => {
    res.json(timeSlots);
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});