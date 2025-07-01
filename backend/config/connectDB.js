const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

module.exports = connectDatabase;