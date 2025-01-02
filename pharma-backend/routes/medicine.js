const express = require('express');
const Medicine = require('../models/Medicine'); // Medicine model
const router = express.Router();

// Fetch all medicines or filter by name
router.get('/', async (req, res) => {
  const { name } = req.query;

  try {
    const medicines = name
      ? await Medicine.find({ name: new RegExp(name, 'i') }) // Search by name
      : await Medicine.find(); // Fetch all medicines

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new medicine
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const medicine = new Medicine({ name, description, price });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
