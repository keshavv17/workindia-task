const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const bookingServices = require('../services/bookingServices');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { train_id } = req.body;
        const userId = req.user.id;

        const booking = await bookingServices.bookSeat({ userId, train_id });
        return res.json({ message: 'Seat booked successfully', booking });

    } catch (e) {
        return res.json({ msg: error.message });
    }
});

router.get('/:booking_id', authMiddleware, async (req, res) => {
    try {
        const { booking_id } = req.params;
        const userId = req.user.id;

        const booking = await bookingServices.getBookingDetail({ booking_id, userId });
        return res.json(booking);

    } catch (e) {
        return res.json({ msg: error.message });
    }
});

module.exports = router;
