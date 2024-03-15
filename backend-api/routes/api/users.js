const router = require('express').Router();
const { signup } = require('../../utils/users');
const { validateSignup, methodError } = require('../../utils/validation-and-error-handling');

router.route('/')
    .post(validateSignup, signup)
    .all(methodError);

module.exports = router;
