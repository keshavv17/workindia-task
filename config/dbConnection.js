require('dotenv').config();
const { Pool, Pool } = require('pg');

const Pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
});

module.exports = {
    Pool
}