const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { getEvents, getEventByEventId, createEventImage, editEvent, deleteEvent } = require('../../utils/events');
const { methodError, validEventId, properEventImageAuth, properEventEditAuth, validateEventEdit, groupMember, validateGroupEventAttendenceEdit, properRemoveAttendanceAuth, validateGetEventsQuery } = require('../../utils/validation-and-error-handling');
const { getAttendees, applyAttendance, editAttendance, removeAttendee } = require('../../utils/attendees');

router.route('/')
    .get(validateGetEventsQuery, getEvents)
    .all(methodError);

router.route('/:id/images')
    .all(validEventId, requireAuth)
    .post(properEventImageAuth, createEventImage)
    .all(methodError);

router.route('/:id/attendees')
    .all(validEventId)
    .get(getAttendees)
    .all(methodError);

router.route('/:id/attendance/:userId')
    .all(validEventId)
    .delete(requireAuth, properRemoveAttendanceAuth, removeAttendee)
    .all(methodError);

router.route('/:id/attendance')
    .all(validEventId)
    .post(requireAuth, groupMember, applyAttendance)
    .patch(requireAuth, validateGroupEventAttendenceEdit, editAttendance)
    .all(methodError);

router.route('/:id')
    .all(validEventId)
    .get(getEventByEventId)
    .put(requireAuth, properEventEditAuth, validateEventEdit, editEvent)
    .delete(requireAuth, properEventEditAuth, deleteEvent)
    .all(methodError);

module.exports = router;
