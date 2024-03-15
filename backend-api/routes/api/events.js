const router = require('express').Router();
const { getEvents, getEventByEventId } = require('../../utils/events');
const { methodError, validEventId } = require('../../utils/validation-and-error-handling');

router.route('/')
    .get(getEvents)
    .all(methodError);

router.route('/:id')
    .all(validEventId)
    .get(getEventByEventId)
    .all(methodError);

module.exports = router;
