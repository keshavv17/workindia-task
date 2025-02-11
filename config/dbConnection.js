require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = {
    query: (text, params) => Pool.query(text, params),
    begin: () => pool.query('BEGIN'),
    commit: () => pool.query('COMMIT'),
    rollback: () => pool.query('ROLLBACK')
}