const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { deleteEventImage } = require('../../utils/events');
const { methodError, validEventImageId } = require('../../utils/validation-and-error-handling');

router.route('/:id')
    .delete(requireAuth, validEventImageId, deleteEventImage)
    .all(methodError);

module.exports = router;
