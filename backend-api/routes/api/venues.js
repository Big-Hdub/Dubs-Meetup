const express = require('express');
const { validVenueId, properVenueAuth, validateVenueEdit, validateVenueCreate } = require('../../utils/validation-and-error-handling');
const { requireAuth } = require('../../utils/auth');
const { editVenue, createVenue } = require('../../utils/venues')
const router = express.Router();

router.route('/:id')
    .all(validVenueId)
    .put(requireAuth, properVenueAuth, validateVenueEdit, editVenue)

module.exports = router;
