const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://192.168.100.128' })); // Only allow VM1
app.use(mongoSanitize()); // Block NoSQL injection

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'WeatherSnap API is running' });
});

// Connect to MongoDB on VM3 and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB on VM3');
    app.listen(process.env.PORT, () => {
      console.log(`Backend running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
