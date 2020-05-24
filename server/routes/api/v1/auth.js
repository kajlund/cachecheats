const router = require('express').Router();

const { protect } = require('../../../middleware/auth');

const { register, login, logout, me } = require('../../../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, me);

module.exports = router;
