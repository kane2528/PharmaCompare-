const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const auth = require('../middleware/auth');

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected: Get favorites
router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('favorites');
  res.json(user.favorites);
});

// Protected: Add to favorites
router.post('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites.push(req.body.medicineId);
  await user.save();
  res.json({ message: 'Favorite added' });
});

// Protected: Remove from favorites
router.delete('/favorites/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites = user.favorites.filter((id) => id.toString() !== req.params.id);
  await user.save();
  res.json({ message: 'Favorite removed' });
});

module.exports = router;
