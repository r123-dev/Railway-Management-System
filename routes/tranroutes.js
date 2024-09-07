const express = require('express');
const router = express.Router();
const trainController = require('../Controllers/traincontroller');
const authenticateToken = require('../middlewares/authmiddl');
const adminMiddleware = require('../middlewares/adminmiddle');


router.post('/', authenticateToken, adminMiddleware, trainController.addTrain);
router.put('/seats', authenticateToken, adminMiddleware, trainController.updateSeats);


router.get('/:source/:destination', trainController.getAvailability);

module.exports = router;
