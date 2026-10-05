class AppError extends Error {
  constructor(message, statusCode, type = 'InternalError', details = []) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.details = details;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
