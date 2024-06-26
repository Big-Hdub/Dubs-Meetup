const router = require('express').Router();
const { validVenueId, properVenueAuth, validateVenueEdit, validateVenueCreate, methodError } = require('../../utils/validation-and-error-handling');
const { requireAuth } = require('../../utils/auth');
const { editVenue } = require('../../utils/venues')

router.route('/:id')
    .put(requireAuth, validVenueId, properVenueAuth, validateVenueEdit, editVenue)
    .all(methodError);

module.exports = router;
