require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors'); // Catch async errors without try-catch blocks
const { rateLimit } = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

// Import configurations
const swaggerSpec = require('./config/swagger');

// Initialize app
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000, 10), // 15 minutes by default
  max: parseInt(process.env.RATE_LIMIT_MAX || 100, 10),
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Import API routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/projects', require('./routes/projects.routes'));
app.use('/api/v1/issues', require('./routes/issues.routes'));

// Global Error Handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
