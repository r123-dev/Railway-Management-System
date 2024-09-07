const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authr');
const trainRoutes = require('./routes/tranroutes');
const bookingRoutes = require('./routes/bookroutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/trains', trainRoutes);
app.use('/bookings', bookingRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
