const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { getEvents, getEventByEventId, createEventImage, editEvent, deleteEvent } = require('../../utils/events');
const { methodError, validEventId, properEventImageAuth, properEventEditAuth, validateEventEdit, groupMember, validateGroupEventAttendenceEdit } = require('../../utils/validation-and-error-handling');
const { getAttendees, applyAttendance, editAttendance } = require('../../utils/attendees');

router.route('/')
    .get(getEvents)
    .all(methodError);

router.route('/:id/images')
    .all(validEventId, requireAuth)
    .post(properEventImageAuth, createEventImage)
    .all(methodError);

router.route('/:id/attendees')
    .all(validEventId)
    .get(getAttendees)
    .patch(requireAuth, validateGroupEventAttendenceEdit, editAttendance)
    .all(methodError);

router.route('/:id/apply')
    .all(validEventId)
    .post(requireAuth, groupMember, applyAttendance)

router.route('/:id')
    .all(validEventId)
    .get(getEventByEventId)
    .put(requireAuth, properEventEditAuth, validateEventEdit, editEvent)
    .delete(requireAuth, properEventEditAuth, deleteEvent)
    .all(methodError);

module.exports = router;
