const express = require('express');
const router = express.Router();

const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const trainServices = require('../services/trainServices');

router.post('/add', apiKeyMiddleware, async (req, res) => {
    try {
        const { name, source, destination, total_seats } = req.body;
        const newTrain = await trainServices.createTrain({ name, source, destination, total_seats });
        return res.status(201).json({ message: 'Train added successfully', train: newTrain });

    } catch (e) {
        console.error(e);
        return res.json({ msg: 'Internal Server Error' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await trainServices.getTrainsByRoutes(source, destination);
    } catch (e) {
        console.log(e.message);
        return res.json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
