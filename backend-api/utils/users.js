const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('./auth');
const { User } = require('../db/models');

const signup = async (req, res, next) => {
    const { email, firstName, lastName, password, username } = req.body;
    const emailCheck = await User.findOne({ where: { email: email } });
    if (emailCheck) {
        const err = new Error("User already exists");
        err.errors.email = "User with that email already exists"
        err.status = 500;
        return next(err);
    };
    const userNameCheck = await User.findOne({ where: { username: username } });
    if (userNameCheck) {
        const err = new Error("User already exists");
        err.errors.username = "User with that username already exists"
        err.status = 500;
        return next(err);
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, firstName, lastName, username, hashedPassword });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
}

module.exports = {
    signup
}
