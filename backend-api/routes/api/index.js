const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

// Add a XSRF-TOKEN cookie
router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

const sessionRouter = require('./session.js');
router.use('/session', sessionRouter);

const usersRouter = require('./users.js');
router.use('/users', usersRouter);

const groupsRouter = require('./groups.js');
router.use('/groups', groupsRouter);

const venuesRouter = require('./venues.js');
router.use('/venues', venuesRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
