const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { getEvents, getEventByEventId, createEventImage, editEvent } = require('../../utils/events');
const { methodError, validEventId, properEventImageAuth, properEventEditAuth, validateEventEdit } = require('../../utils/validation-and-error-handling');

router.route('/')
    .get(getEvents)
    .all(methodError);

router.route('/:id/images')
    .all(validEventId, requireAuth)
    .post(properEventImageAuth, createEventImage)
    .all(methodError)

router.route('/:id')
    .all(validEventId)
    .get(getEventByEventId)
    .put(requireAuth, properEventEditAuth, validateEventEdit, editEvent)
    .all(methodError);

module.exports = router;
