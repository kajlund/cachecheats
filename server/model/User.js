const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false, // Don't return pwd in queries
  },
  avatar: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isAllowedAccess: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
