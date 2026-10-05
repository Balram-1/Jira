const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const errorHandler = (err, req, res, next) => {
  const requestId = uuidv4();
  
  // Default values
  let statusCode = 500;
  let type = 'InternalError';
  let message = 'Something went wrong';
  let details = [];

  // If it's our custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    type = err.type;
    message = err.message;
    details = err.details;
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    type = 'ValidationError';
    message = 'Invalid input data';
    details = Object.values(err.errors).map(val => val.message);
  } else if (err.code === 11000) {
    // Mongoose duplicate key
    statusCode = 409;
    type = 'ConflictError';
    message = 'Duplicate field value entered';
    details = [Object.keys(err.keyValue)[0]];
  } else if (err.name === 'CastError') {
    // Mongoose bad ObjectId
    statusCode = 400;
    type = 'ValidationError';
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.name === 'ZodError') {
    // Zod validation error
    statusCode = 400;
    type = 'ValidationError';
    message = 'Validation failed';
    details = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
  }

  // Log the error
  if (statusCode === 500) {
    logger.error(`[${requestId}] 500 Error:`, err);
  } else {
    logger.warn(`[${requestId}] ${statusCode} ${type}: ${message}`);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    statusCode,
    error: type,
    message,
    details,
    requestId,
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
