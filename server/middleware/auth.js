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
    token = req.cookies.token; // Set token from cookie
  }

  // Make sure token exists
  if (!token) {
    return next(new CustomError('Not authorized to access this route', 401));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new CustomError('Not authorized to access this route', 401));
  }
});
