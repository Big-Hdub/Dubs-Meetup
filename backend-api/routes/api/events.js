const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { getEvents, getEventByEventId, createEventImage, editEvent, deleteEvent } = require('../../utils/events');
const { methodError, validEventId, properEventImageAuth, properEventEditAuth, validateEventEdit, groupMember, validateGroupEventAttendenceEdit, properRemoveAttendanceAuth, validateGetEventsQuery } = require('../../utils/validation-and-error-handling');
const { getAttendees, applyAttendance, editAttendance, removeAttendee } = require('../../utils/attendees');

router.route('/')
    .get(validateGetEventsQuery, getEvents)
    .all(methodError);

router.route('/:id/images')
    .post(requireAuth, validEventId, properEventImageAuth, createEventImage)
    .all(methodError);

router.route('/:id/attendees')
    .get(validEventId, getAttendees)
    .all(methodError);

router.route('/:id/attendance/:userId')
    .delete(requireAuth, validEventId, properRemoveAttendanceAuth, removeAttendee)
    .all(methodError);

router.route('/:id/attendance')
    .post(requireAuth, validEventId, groupMember, applyAttendance)
    .patch(requireAuth, validEventId, validateGroupEventAttendenceEdit, editAttendance)
    .all(methodError);

router.route('/:id')
    .get(validEventId, getEventByEventId)
    .put(requireAuth, validEventId, properEventEditAuth, validateEventEdit, editEvent)
    .delete(requireAuth, validEventId, properEventEditAuth, deleteEvent)
    .all(methodError);

module.exports = router;
