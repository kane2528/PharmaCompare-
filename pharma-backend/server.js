const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const medicineRoutes = require('./routes/medicine');
const pharmacyRoutes = require('./routes/pharmacy');

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/pharmacies', pharmacyRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
