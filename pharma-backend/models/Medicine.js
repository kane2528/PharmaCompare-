const mongoose = require('mongoose');
const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});
module.exports = mongoose.model('Medicine', MedicineSchema);
