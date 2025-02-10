const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByEmail, registerUser } = require("../services/userServices")


router.post('/register', async (req, res) => {
    const { email, password } = req.body();
    try {
        const newUser = await registerUser(email, password);
        res.json({
            msg: "user registered!",
            user: newUser
        });
    } catch (e) {
        res.json({ error: e.message });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user)
            res.json({ msg: "Invalid credentials!" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            res.json({ msg: "Invalid Credentials!" });

        const token = jwt.sign({ user_id: user.id, role: user.role }, process.env.JWT_SECRET);

        res.json({
            message: "user logged in!",
            token
        });
    } catch (e) {
        res.json({ error: e.message });
    }
});

module.exports = router;