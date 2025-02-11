const db = require('../config/dbConnection');

async function createTrain({ name, source, destination, total_seats: total_seats }) {
    const queryText = `INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *`;
    const values = [name, source, destination, total_seats];
    const result = await db.query(queryText, values);
    return result.rows[0];
};

async function getTrainsByRoutes(source, destination) {
    const queryText = `SELECT * FROM trains WHERE source = $1 AND destination = $2`;
    const values = [source, destination];
    const result = await db.query(queryText, values);
    console.log(result);
    return result.rows;
};

module.exports = {
    createTrain,
    getTrainsByRoutes
};