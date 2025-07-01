const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./config/connectDB');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const withdrawalRoutes = require('./routes/withdrawalRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://startling-caramel-13534a.netlify.app'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/withdrawals', withdrawalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('/{*any}', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect to database and start server
connectDatabase()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
