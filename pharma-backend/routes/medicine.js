const express = require('express');
const Medicine = require('../models/Medicine');
const router = express.Router();

// Fetch medicines by name
router.get('/', async (req, res) => {
  const { name } = req.query;
  const medicines = await Medicine.find({ name: new RegExp(name, 'i') });
  res.json(medicines);
});

// Fetch detailed medicine information by ID
router.get('/:id', async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  res.json(medicine);
});

module.exports = router;
