const router = require('express').Router();

const wrap = require('../../../middleware/wrap');
const { protect } = require('../../../middleware/auth');

const { register, login, logout, me } = require('../../../controllers/auth');

router.post('/register', wrap(register));
router.post('/login', wrap(login));
router.get('/logout', logout);
router.get('/me', protect, wrap(me));

module.exports = router;
