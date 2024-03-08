const express = require('express')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { login, logout, getUser } = require('../../utils/logging');
const router = express.Router();

router.route('/')
    .get(getUser)
    .post(login)
    .delete(logout)


module.exports = router;
