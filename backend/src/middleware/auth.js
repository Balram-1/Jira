const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    throw new AppError('Not logged in. Please log in to get access.', 401, 'AuthError');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      throw new AppError('The user belonging to this token no longer exists.', 401, 'AuthError');
    }
    
    if (!currentUser.isActive) {
      throw new AppError('User account is deactivated.', 403, 'ForbiddenError');
    }

    req.user = currentUser;
    next();
  } catch (error) {
    throw new AppError('Invalid or expired token', 401, 'AuthError');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action', 403, 'ForbiddenError');
    }
    next();
  };
};

module.exports = { authenticate, authorize };
