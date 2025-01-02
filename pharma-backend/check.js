const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();
const checkCollections = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    console.log('Collections:', collectionNames);
    if (collectionNames.includes('users')) console.log('User collection exists');
    if (collectionNames.includes('pharmacies')) console.log('Pharmacy collection exists');
    if (collectionNames.includes('medicines')) console.log('Medicine collection exists');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

checkCollections();
