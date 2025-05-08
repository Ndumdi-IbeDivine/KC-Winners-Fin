const express = require("express");
require("dotenv").config();
const connectDatabase = require("./config/connectDB.js");
const authRouter = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use('/api/auth', authRouter)

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the KC-Winners Contribution Platform API!");
});

// Start Server

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
});
