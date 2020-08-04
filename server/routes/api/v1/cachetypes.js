const express = require('express');

const wrap = require('../../../middleware/wrap');
const { protect, authorize } = require('../../../middleware/auth');

const router = express.Router();

const {
  queryCacheTypes,
  cacheTypeById,
  createCacheType,
  updateCacheType,
  deleteCacheType,
} = require('../../../controllers/cachetypes');

router
  .route('/')
  .get(protect, authorize('user', 'admin'), wrap(queryCacheTypes))
  .post(protect, authorize('admin'), wrap(createCacheType));

router
  .route('/:id')
  .get(protect, authorize('user', 'admin'), wrap(cacheTypeById))
  .put(protect, authorize('admin'), wrap(updateCacheType))
  .delete(protect, authorize('admin'), wrap(deleteCacheType));

module.exports = router;
