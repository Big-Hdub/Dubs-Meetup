const router = require('express').Router();
const { requireAuth } = require('../../utils/auth');
const { validGroupImage, methodError } = require('../../utils/validation-and-error-handling')
const { deleteGroupImage } = require('../../utils/groups')

router.route('/:id')
    .delete(requireAuth, validGroupImage, deleteGroupImage)
    .all(methodError);

module.exports = router;
