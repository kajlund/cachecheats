const express = require('express');

const wrap = require('../../../middleware/wrap');

const {
  getMunicipalities,
  getMunicipality,
  createMunicipality,
  updateMunicipality,
  deleteMunicipality,
} = require('../../../controllers/municipalities');

const router = express.Router();

router.route('/').get(wrap(getMunicipalities)).post(wrap(createMunicipality));

router
  .route('/:id')
  .get(wrap(getMunicipality))
  .put(wrap(updateMunicipality))
  .delete(wrap(deleteMunicipality));

module.exports = router;
