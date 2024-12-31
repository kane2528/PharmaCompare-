const mongoose = require('mongoose');
const PharmacySchema = new mongoose.Schema({
  name: String,
  address: String,
  prices: [{ medicineId: String, price: Number }],
});
module.exports = mongoose.model('Pharmacy', PharmacySchema);
