const express = require('express');
const { signup } = require('../../utils/users');
const router = express.Router();

router.route('/')
    .post(signup)

module.exports = router;
