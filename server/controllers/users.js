const User = require('../model/User');

// @desc   Create new user. Needs admin approval before allowed private routes
// @route  POST /api/v1/users
// @access Public
exports.createUser = wrap(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({ success: true, data: user });
});
