const  query  = require('../models/db');

exports.bookSeat = async (req, res) => {
  const { trainId, seats } = req.body;
  const userId = req.user.userId;

  const connection = await pool.promise().getConnection();
  try {
    await connection.beginTransaction();

    const [train] = await connection.query('SELECT * FROM trains WHERE id = ? FOR UPDATE', [trainId]);
    if (train[0].available_seats < seats) {
      await connection.rollback();
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    await connection.query(
      'UPDATE trains SET available_seats = available_seats - ? WHERE id = ?',
      [seats, trainId]
    );

    const [booking] = await connection.query(
      'INSERT INTO bookings (user_id, train_id, seats) VALUES (?, ?, ?)',
      [userId, trainId, seats]
    );

    await connection.commit();
    res.status(201).json({ id: booking.insertId, trainId, seats });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Error booking seat' });
  } finally {
    connection.release();
  }
};

exports.getBookingDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [id]);
    res.json(booking[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving booking' });
  }
};
