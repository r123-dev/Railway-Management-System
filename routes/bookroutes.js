const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookcontroller');
const authenticateToken = require('../middlewares/authmiddl');


router.post('/', authenticateToken, bookingController.bookSeat);
router.get('/:id', authenticateToken, bookingController.getBookingDetails);

module.exports = router;
