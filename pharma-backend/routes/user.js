const express = require('express');
const User = require('../models/User');
const Medicine = require('../models/Medicine'); // Import Medicine model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name }); // Return user name for frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's favorite medicines
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a medicine to favorites
router.post('/favorites', auth, async (req, res) => {
  const { medicineId } = req.body;

  if (!medicineId) {
    return res.status(400).json({ message: 'Medicine ID is required' });
  }

  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(medicineId)) {
      user.favorites.push(medicineId);
      await user.save();
      res.json({ message: 'Favorite added' });
    } else {
      res.status(400).json({ message: 'Medicine already in favorites' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a medicine from favorites
router.delete('/favorites/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((id) => id.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
