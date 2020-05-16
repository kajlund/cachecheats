const bcrypt = require('bcryptjs');
const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const asyncHandler = require('../../../middleware/async');

const User = require('../../../model/User');
const err = {
  name: 'User name is mandatory and must be between 4 and 50 alfanum characters long',
  email: 'Email is required, must be a valid email and must be unique',
  pwd: 'Password is required and must be at least 6 characters long',
};

// @route   POST api/users
// @desc    Register new user. Needs admin approval before allowed in
// @access  Public
router.post(
  '/',
  [
    check('name', err.name)
      .exists()
      .isString()
      .isAlphanumeric()
      .isLength({ min: 4, max: 50 }),
    check('email', err.email).exists().isString().isEmail(),
    check('password', err.pwd).exists().isString().isLength({ min: 6 }),
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.result = 'error';
      return res.status(400).json({ result: 'error', errors: errors.array() });
    }

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        result: 'error',
        errors: [
          { value: email, msg: 'User already exists', param: 'email', location: 'body' },
        ],
      });
    }
    // Get users Gravatar
    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
    user = new User({ name, email, avatar, password });

    // Encrypt Pwd
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const saved = await User.findById(user._id).select('-password');

    res.send({ result: 'success', data: saved });
  })
);

module.exports = router;
