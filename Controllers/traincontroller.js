const  query  = require('../models/db');

exports.addTrain = async (req, res) => {
  const { source, destination, totalSeats } = req.body;
  try {
    const result = await query(
      'INSERT INTO trains (source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?)',
      [source, destination, totalSeats, totalSeats]
    );
    res.status(201).json({ id: result.insertId, source, destination, totalSeats });
  } catch (error) {
    res.status(400).json({ error: 'Error adding train' });
  }
};


exports.updateSeats = async (req, res) => {
  const { trainId, totalSeats } = req.body;
  try {
    await query(
      'UPDATE trains SET total_seats = ?, available_seats = ? WHERE id = ?',
      [totalSeats, totalSeats, trainId]
    );
    res.status(200).json({ message: 'Seats updated successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error updating seats' });
  }
};


exports.getAvailability = async (req, res) => {
  const { source, destination } = req.params;
  try {
    const trains = await query(
      'SELECT * FROM trains WHERE source = ? AND destination = ?',
      [source, destination]
    );
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving trains' });
  }
};
