const db = require('../config/dbConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(email, plainPassword, role) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(plainPassword, 10);

    const queryText = `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role`;
    const values = [email, hash, role];

    const result = await db.query(queryText, values);
    return result.rows[0];
}

async function findUserByEmail(email) {
    const queryText = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(queryText, [email]);
    return result.rows[0];
}

async function loginUser({ email, password }) {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET);
    return { token };
}

module.exports = {
    registerUser,
    findUserByEmail,
    loginUser
};