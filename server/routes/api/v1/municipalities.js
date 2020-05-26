const express = require('express');

const {
  getMunicipalities,
  getMunicipality,
  createMunicipality,
  updateMunicipality,
  deleteMunicipality,
} = require('../../../controllers/municipalities');

const router = express.Router();

router.route('/').get(getMunicipalities).post(createMunicipality);

router
  .route('/:id')
  .get(getMunicipality)
  .put(updateMunicipality)
  .delete(deleteMunicipality);

module.exports = router;
