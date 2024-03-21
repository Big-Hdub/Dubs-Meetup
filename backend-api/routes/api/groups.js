const router = require('express').Router();
const { createVenue, getVenuesByGroupId } = require('../../utils/venues');
const { getGroups, getCurrentGroups, getGroupById, createGroup, createGroupImage, editGroup, deleteGroup } = require('../../utils/groups');
const { getEventsByGroupId, createEvent } = require('../../utils/events');
const { getMembers, requestMembership } = require('../../utils/members')
const { requireAuth } = require('../../utils/auth');
const { validateGroupCreate, properGroupAuth, validGroupId, validateGroupEdit, properVenueAuth, validateVenueCreate, methodError, properGroupEventAuth, validateEventCreate } = require('../../utils/validation-and-error-handling');

router.route('/')
    .get(getGroups)
    .post(requireAuth, validateGroupCreate, createGroup)
    .all(methodError);

router.route('/current')
    .get(requireAuth, getCurrentGroups)
    .all(methodError);

router.route('/:id/images')
    .all(validGroupId)
    .post(requireAuth, properGroupAuth, createGroupImage)
    .all(methodError);

router.route('/:id/venues')
    .all(validGroupId, requireAuth)
    .get(properGroupAuth, getVenuesByGroupId)
    .post(properVenueAuth, validateVenueCreate, createVenue)
    .all(methodError);

router.route('/:id/events')
    .all(validGroupId)
    .get(getEventsByGroupId)
    .post(requireAuth, properGroupEventAuth, validateEventCreate, createEvent)
    .all(methodError);

router.route('/:id/members')
    .all(validGroupId)
    .get(getMembers)
    .all(methodError);

router.route('/:id/join')
    .all(validGroupId)
    .post(requireAuth, requestMembership)
    .all(methodError);

router.route('/:id')
    .all(validGroupId)
    .get(getGroupById)
    .put(requireAuth, properGroupAuth, validateGroupEdit, editGroup)
    .delete(requireAuth, properGroupAuth, deleteGroup)
    .all(methodError);

module.exports = router;
