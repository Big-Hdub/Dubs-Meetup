const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('./auth');
const { User } = require('../db/models');

const signup = async (req, res) => {
    const { email, firstName, lastName, password, username } = req.body;
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
