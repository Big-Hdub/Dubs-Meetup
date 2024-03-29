const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);

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

const eventsRouter = require('./events.js');
router.use('/events', eventsRouter);

const groupImagesRouter = require('./groupImages.js');
router.use('/group-images', groupImagesRouter);

const eventImagesRouter = require('./eventImages.js');
router.use('/event-images', eventImagesRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
