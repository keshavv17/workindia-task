const db = require('../config/dbConnection');
const bcrypt = require('bcrypt');

async function registerUser(email, plainPassword) {
    const hash = await bcrypt.hash(plainPassword, 10);

    const queryText = `INSERT INTO users (email, password, role) VALUES ($1, $2, 'user') RETURNING id, email, role`;
    const values = [email, hash];

    const result = await db.query(queryText, values);
    return result.rows[0];
}

async function findUserByEmail(email){
    const queryText = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(queryText, [email]);
    return result.rows[0];
}

module.exports = {
    registerUser,
    findUserByEmail
};