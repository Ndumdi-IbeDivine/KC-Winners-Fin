const sequelize = require('./db');
require('../model/userModel.js');
// require('../model/userProfile.js');
require('dotenv').config();


// connecting databse
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
   
    console.log("Loaded models:", sequelize.models);
    await sequelize.sync({ alter: true})
    console.log('Tables have been synced')

  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

module.exports = connectDatabase;