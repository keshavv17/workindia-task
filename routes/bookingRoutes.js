const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const bookingServices = require('../services/bookingServices');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const train_id = req.body.train_id;
        const userId = req.user.id;

        const booking = await bookingServices.bookSeat(userId, train_id);
        return res.json({ msg: 'Seat booked successfully', booking });

    } catch (e) {
        return res.json({ msg: e.message });
    }
});

router.get('/userbookings', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingServices.getBookings(userId);
        return res.json(bookings);

    } catch (e) {
        return res.json({ msg: e.message });
    }
});

module.exports = router;
