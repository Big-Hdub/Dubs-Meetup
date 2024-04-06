const router = require('express').Router();
const { createVenue, getVenuesByGroupId } = require('../../utils/venues');
const { getGroups, getCurrentGroups, getGroupById, createGroup, createGroupImage, editGroup, deleteGroup } = require('../../utils/groups');
const { getEventsByGroupId, createEvent } = require('../../utils/events');
const { getMembers, requestMembership, editMembership, deleteMembership } = require('../../utils/members')
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
    .post(requireAuth, validGroupId, properGroupAuth, createGroupImage)
    .all(methodError);

router.route('/:id/venues')
    .get(requireAuth, validGroupId, properVenueAuth, getVenuesByGroupId)
    .post(requireAuth, validGroupId, properVenueAuth, validateVenueCreate, createVenue)
    .all(methodError);

router.route('/:id/events')
    .get(validGroupId, getEventsByGroupId)
    .post(requireAuth, validGroupId, properGroupEventAuth, validateEventCreate, createEvent)
    .all(methodError);

router.route('/:id/members')
    .get(validGroupId, getMembers)
    .all(methodError);

router.route('/:id/membership')
    .post(requireAuth, validGroupId, requestMembership)
    .put(requireAuth, validGroupId, editMembership)
    .all(methodError);

router.route('/:id/membership/:memberId')
    .delete(requireAuth, validGroupId, deleteMembership)
    .all(methodError);

router.route('/:id')
    .get(validGroupId, getGroupById)
    .put(requireAuth, validGroupId, properGroupAuth, validateGroupEdit, editGroup)
    .delete(requireAuth, validGroupId, properGroupAuth, deleteGroup)
    .all(methodError);

module.exports = router;
