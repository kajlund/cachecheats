const express = require('express');
const router = express.Router();

const cnf = require('../../../config');

// @route   GET api/v1/about
// @desc    About API
// @access  Public
router.get('/', (req, res) => {
  res.json({ result: 'success', data: cnf.client });
});

module.exports = router;
