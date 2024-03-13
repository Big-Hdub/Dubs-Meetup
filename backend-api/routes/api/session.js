const express = require('express')
const { login, logout, getUser } = require('../../utils/logging');
const { validateLogin } = require('../../utils/validation-and-error-handling');
const router = express.Router();

router.route('/')
    .get(getUser)
    .post(validateLogin, login)
    .delete(logout)

module.exports = router;
