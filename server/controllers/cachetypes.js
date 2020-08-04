const { CustomError } = require('../util/errors');
const CacheType = require('../model/CacheType');

// @desc      Query CacheTypes
// @route     GET /api/v1/cachetypes
// @access    Public
exports.queryCacheTypes = async (req, res, next) => {
  const ct = await CacheType.find();

  res.status(200).json({
    success: true,
    count: ct.length,
    data: ct,
  });
};

// @desc   Get single CacheType
// @route  GET /api/v1/cachetypes/:id
// @access Public
exports.cacheTypeById = async (req, res, next) => {
  const ct = await CacheType.findById(req.params.id);
  if (!ct) {
    return next(
      new CustomError(`Not Found. CacheType id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: ct });
};

// @desc   Create CacheType
// @route  POST /api/v1/cachetypes
// @access Private
exports.createCacheType = async (req, res, next) => {
  const ct = await CacheType.create(req.body);
  res.status(201).json({ success: true, data: ct });
};

// @desc   Update CacheType
// @route  PUT /api/v1/cachetypes/:id
// @access Private
exports.updateCacheType = async (req, res, next) => {
  const ct = await CacheType.findById(req.params.id);
  if (!ct) {
    return next(
      new CustomError(`Not Found. CacheType id: ${req.params.id}`, 404)
    );
  }

  ct.name = req.body.name || ct.name;
  ct.description = req.body.description || ct.description;

  await ct.save();
  res.status(200).json({ success: true, data: ct });
};

// @desc   Delete CacheType
// @route  DELETE /api/v1/cachetypes/:id
// @access Private
exports.deleteCacheType = async (req, res, next) => {
  const ct = await Municipality.findById(req.params.id);
  if (!ct) {
    return next(
      new CustomError(`Not Found. CacheType id: ${req.params.id}`, 404)
    );
  }

  ct.remove();
  res.status(200).json({ success: true, data: {} });
};
