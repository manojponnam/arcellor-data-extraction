// arcelor-backend/src/app.js
const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./api/uploadRoutes');
const applicationRoutes = require('./api/applicationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes v2
app.use('/api/v2', uploadRoutes);
app.use('/api/v2', applicationRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'online',
    service: 'ArcelorMittal Customer Onboarding API',
    version: '2.0.0'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'An unexpected error occurred',
    message: err.message 
  });
});

module.exports = app;

