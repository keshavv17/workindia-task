// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');

router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const newUser = await userServices.registerUser({ email, password, role });
        return res.json({ msg: 'User registered successfully', user: newUser });

    } catch (error) {
        return res.json({ msg: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userServices.loginUser({ email, password });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in /login:', error);
        // If there's an authentication error, you might want to send 401
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

module.exports = router;
