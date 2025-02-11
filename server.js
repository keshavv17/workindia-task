require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());

const authRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/booking');
const trainRoutes = require('./routes/train');

app.use('/auth',authRoutes);
app.use('/trains',trainRoutes);
app.use('/bookings',bookingRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
