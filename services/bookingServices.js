const db = require('../config/dbConnection');

async function bookSeat(userId, trainId) {
    try {
        await db.query('BEGIN');
        const trainRes = await db.query(`SELECT * FROM trains WHERE train_id = $1 FOR UPDATE`, [trainId]);
        if (trainRes.rowCount === 0) {
            await db.query('ROLLBACK');
            throw new Error('train not found');
        }

        const train = trainRes.rows[0];
        if (train.available_seats <= 0) {
            db.query('ROLLBACK');
            throw new Error("No seats available");
        }

        const seatNumber = train.available_seats;

        await db.query('UPDATE trains SET available_seats = available_seats-1 WHERE train_id = $1', [trainId]);

        const bookingRes = await db.query(`INSERT INTO bookings (user_id, train_id, seat_number) VALUES ($1, $2, $3) RETURNING *`, [userId, trainId, seatNumber]);

        await db.query('COMMIT');
        return bookingRes.rows[0];
    } catch (e) {
        await db.query('ROLLBACK');
        throw e;
    }
}

async function getBookingsById(bookingId) {
    const results = await db.query(`SELECT * FROM bookings WHERE booking_id=$1`, [bookingId]);
    return results.rows[0] || null;
}

module.exports = {
    bookSeat,
    getBookingsById
};