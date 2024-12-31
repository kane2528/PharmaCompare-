const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();

// Fetch pharmacies by medicine ID
router.get('/', async (req, res) => {
  const { medicineId } = req.query;
  const pharmacies = await Pharmacy.find({ 'prices.medicineId': medicineId });
  res.json(pharmacies);
});

module.exports = router;
