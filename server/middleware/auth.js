const jwt = require('jsonwebtoken');

const { CustomError } = require('../util/errors');
const User = require('../model/User');
const wrap = require('./wrap');

exports.protect = wrap(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    throw new CustomError('Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    // if (!req.user.role) {
    //   // Admin needs to assign a role before user has access
    //   throw new CustomError('Not authorized to access this route', 401);
    // }

    next();
  } catch (err) {
    throw new CustomError(err.message, 401);
  }
});
