const express = require('express');
const Pharmacy = require('../models/Pharmacy');
const router = express.Router();

router.get('/pharmacies', async (req, res) => {
  const { medicineId } = req.query;

  if (!medicineId) {
    return res.status(400).json({ message: 'Medicine ID is required' });
  }

  try {
    const pharmacies = await Pharmacy.find({ 'prices.medicineId': medicineId })
      .populate('prices.medicineId', 'name description'); // Populates medicine details

    const results = pharmacies.map((pharmacy) => {
      const priceDetails = pharmacy.prices.find(
        (price) => price.medicineId.toString() === medicineId
      );
      return {
        pharmacyName: pharmacy.name,
        address: pharmacy.address,
        price: priceDetails.price,
      };
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching pharmacies:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
