const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { bookSeat, getBookingsById } = require('../services/bookingService');

router.post('/', authMiddleware, async (req, res) => {
    const { train_id } = req.body;

    try {
        const booking = await bookSeat(userId, train_id);
        const userId = req.user.user_id;

        res..json({ message: 'Booking successful', booking });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});
})

router.get('/:id', authMiddleware, async (req, res) => {
    const bookingId = req.params.id;
    
})