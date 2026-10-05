const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const auditService = require('../services/auditService');

const signToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already in use', 409, 'ConflictError');
  }
  
  const passwordHash = await bcrypt.hash(password, 12);
  
  const newUser = await User.create({
    name,
    email,
    passwordHash,
    // Make the user an ADMIN by default so they can create projects and test the app
    role: 'ADMIN' 
  });
  
  await auditService.log({ req, action: 'REGISTER', resource: 'User', resourceId: newUser._id });
  
  const token = signToken(newUser._id, newUser.role);
  
  res.status(201).json({
    success: true,
    token,
    user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400, 'ValidationError');
  }
  
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    await auditService.log({ req, action: 'LOGIN_FAILED', meta: { email }, result: 'FAILURE' });
    throw new AppError('Incorrect email or password', 401, 'AuthError');
  }
  
  if (!user.isActive) {
    throw new AppError('Account is deactivated', 403, 'ForbiddenError');
  }
  
  const token = signToken(user._id, user.role);
  
  // Fake req.user for audit log
  req.user = user;
  await auditService.log({ req, action: 'LOGIN', resource: 'User', resourceId: user._id });
  
  res.status(200).json({
    success: true,
    token,
    user: { _id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

exports.getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: { _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role }
  });
};
