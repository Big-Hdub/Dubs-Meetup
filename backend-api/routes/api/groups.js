const express = require('express');
const router = express.Router();
const { getGroups, getCurrentGroups, getGroupById, createGroup } = require('../../utils/groups');
const { requireAuth } = require('../../utils/auth');

router.route('/')
    .get(getGroups)
    .post(requireAuth, createGroup)

router.route('/current')
    .get(requireAuth, getCurrentGroups)

router.route('/:id')
    .get(getGroupById)

module.exports = router;
