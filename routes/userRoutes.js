const express = require('express');
const router = express.Router();
const userServices = require('../services/userServices');

router.post('/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const newUser = await userServices.registerUser(email, password, role);
        return res.json({ msg: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error in /register:', error);
        return res.json({ msg: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await userServices.loginUser({ email, password });
        return res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in /login:', error);
        return res.json({ message: error.message });
    }
});

module.exports = router;
