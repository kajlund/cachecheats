const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      result: 'error',
      errors: [{ msg: 'Request has no authorization header' }],
    });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded.user.role) {
      // Admin needs to assign a role before user has access
      return res.status(401).json({
        result: 'error',
        errors: [{ msg: 'User account is registered but has not been approved' }],
      });
    }
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({
      result: 'error',
      errors: [{ msg: 'Invalid token' }],
    });
  }
};
