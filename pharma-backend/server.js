const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Authentication routes
const medicineRoutes = require('./routes/medicine'); // Medicine routes
const userRoutes = require('./routes/user'); // User routes
const pharmacyRoutes = require('./routes/pharmacy'); // Pharmacy routes
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all origins (or specify the frontend origin)
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pharmacies', pharmacyRoutes); // Add pharmacy routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
