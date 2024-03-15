const router = require('express').Router();
const { login, logout, getUser } = require('../../utils/logging');
const { validateLogin, methodError } = require('../../utils/validation-and-error-handling');


router.route('/')
    .get(getUser)
    .post(validateLogin, login)
    .delete(logout)
    .all(methodError);

module.exports = router;
