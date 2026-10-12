const express = require('express');
const { calculateSum, greet, validateEmail } = require('./utils/helpers');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'GitHub Action Demo API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/greet/:name', (req, res) => {
  const greeting = greet(req.params.name);
  res.json({ greeting });
});

app.post('/calculate', (req, res) => {
  try {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
      return res.status(400).json({ error: 'numbers must be an array' });
    }
    const sum = calculateSum(numbers);
    res.json({ sum, count: numbers.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/validate-email', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email is required' });
    }
    const isValid = validateEmail(email);
    res.json({ email, isValid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { app, server };
