const is = require('is_js');

const User = require('../model/User');
const { CustomError } = require('../util/errors');

// @desc      Register user. Free to register but Admin must set role before accepted
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
};

// @desc   Logon user and return JWT token on success
// @route  POST /api/v1/auth/login
// @access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !is.email(email)) {
    return next(
      new CustomError('Please provide a valid email and a password', 400)
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new CustomError('Invalid credentials', 401));
  }

  // Check password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new CustomError('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
};

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.me = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Use HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Client can decide to use cookie or bearer token Authorization header
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
