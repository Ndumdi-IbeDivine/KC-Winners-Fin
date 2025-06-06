const express = require("express");
require("dotenv").config();
const cors = require('cors');
// const path = require('path');

const connectDatabase = require("./config/connectDB.js");
const authRouter = require('./routes/authRoutes.js');
const contributionRouter = require('./routes/contributionRoutes.js');
const adminRouter = require('./routes/adminRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));


// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to KC Winners API");
});

app.use('/api/auth', authRouter);
app.use('/api/contribution', contributionRouter);
app.use('/api/admin', adminRouter);

// Start Server

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
});
