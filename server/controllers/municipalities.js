const { CustomError } = require('../util/errors');
const Municipality = require('../model/Municipality');

// @desc      Get municipalities
// @route     GET /api/v1/municipalities
// @access    Public
exports.getMunicipalities = async (req, res, next) => {
  const m = await Municipality.find();

  res.status(200).json({
    success: true,
    count: m.length,
    data: m,
  });
};

// @desc   Get single Municipality
// @route  GET /api/v1/municipalities/:id
// @access Public
exports.getMunicipality = async (req, res, next) => {
  const m = await Municipality.findById(req.params.id);
  if (!m) {
    return next(
      new CustomError(`Not Found. Municipality id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: m });
};

// @desc   Create Municipality
// @route  POST /api/v1/municipalities
// @access Public
exports.createMunicipality = async (req, res, next) => {
  const m = await Municipality.create(req.body);
  res.status(201).json({ success: true, data: m });
};

// @desc   Update Municipality
// @route  PUT /api/v1/municipalities/:id
// @access Public
exports.updateMunicipality = async (req, res, next) => {
  const m = await Municipality.findById(req.params.id);
  if (!m) {
    return next(
      new CustomError(`Not Found. Municipality id: ${req.params.id}`, 404)
    );
  }

  m.code = req.body.code || m.code;
  m.name = req.body.name || m.name;

  await m.save();
  res.status(200).json({ success: true, data: m });
};

// @desc   Delete Municipality
// @route  DELETE /api/v1/municipalities/:id
// @access Public
exports.deleteMunicipality = async (req, res, next) => {
  const m = await Municipality.findById(req.params.id);
  if (!m) {
    return next(
      new CustomError(`Not Found. Municipality id: ${req.params.id}`, 404)
    );
  }

  m.remove();
  res.status(200).json({ success: true, data: {} });
};
