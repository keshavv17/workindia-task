const express = require('express');
const router = express.Router();

const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const trainServices = require('../services/trainServices');

router.post('/', apiKeyMiddleware, async (req, res) => {
    try {
        const { train_id, source, destination, total_seats } = req.body;
        const newTrain = await trainServices.addTrain({ train_id, source, destination, total_seats });
        return res.status(201).json({ message: 'Train added successfully', train: newTrain });

    } catch (e) {
        return res.json({ msg: 'Internal Server Error' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const { source, destination } = req.query;
        const trains = await trainServices.getTrainsBetweenStations({ source, destination });
        return res.json(trains);
    } catch (e) {
        return res.json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
