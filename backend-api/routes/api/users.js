const express = require('express');
const { signup } = require('../../utils/users');
const { validateSignup } = require('../../utils/validation-and-error-handling');
const router = express.Router();

router.route('/')
    .post(validateSignup, signup)

module.exports = router;
