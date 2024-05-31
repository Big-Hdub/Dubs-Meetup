const express = require('express');
const router = express.Router();
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);

router.get("/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
});

router.use('/images/landing', express.static('./images/pic-for-dubs-meetup.jpg'));
router.use('/images/group-thumb', express.static('./images/group-thumbnail.jpg'));
router.use('/images/knights', express.static('./images/knights.jpg'));
router.use('/images/cabin', express.static('./images/cabin.jpg'));
router.use('/images/dubs-log', express.static('./images/dubs-log.jpg'));
router.use('/images/volleyball', express.static('./images/volleyball.jpg'));
router.use('/images/coaches', express.static('./images/coaches.jpg'));
router.use('/images/finalFantasy', express.static('./images/finalFantasy.jpg'));
router.use('/images/trunks', express.static('./images/trunks.jpg'));
router.use('/images/sturgeon', express.static('./images/sturgeon.jpg'));
router.use('/images/loading', express.static('./images/loading.gif'));

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

// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
