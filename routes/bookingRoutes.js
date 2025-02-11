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


router.get('/:booking_id', authMiddleware, async (req, res) => {
    try {
        const { booking_id } = req.params;
        const userId = req.user.id;
        const booking = await bookingServices.getBookingsById(booking_id);
        return res.json(booking);

    } catch (e) {
        return res.json({ msg: e.message });
    }
});

module.exports = router;
