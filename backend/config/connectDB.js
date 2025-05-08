const sequelize = require('./db');
require('../model/user.js');
require("dotenv").config();

// if (!process.env.DATABASE_URL) {
//     throw new Error("DATABASE_URL is missing in .env file!");
// }

// const sequelize = new Sequelize(
//   process.env.DATABASE_URL, {
//   dialect: "postgres",
//   logging: false, // Disable logging for cleaner console output
// });

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