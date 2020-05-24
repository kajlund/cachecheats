const pack = require('../package.json');

// @route   GET api/v1/about
// @desc    About API
// @access  Public
exports.about = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      description: pack.description,
      name: 'CacheCheats',
      version: pack.version,
    },
  });
};
