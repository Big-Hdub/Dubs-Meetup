const { environment } = require('../config');
const isProduction = environment === 'production';
const { ValidationError, Op } = require('sequelize');
const { validationResult, check } = require('express-validator');
const { User, Group, Venue, Member, Event, Attendee, GroupImage, EventImage } = require('../db/models');

const notFound = (_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
};

const sequelizeError = (err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        };
        err.title = 'Validation error';
        err.errors = errors;
    };
    next(err);
};

const errorFormater = (err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
};

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    };
    next();
};

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

const validateGroupCreate = [
    check('name')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ max: 60 })
        .notEmpty()
        .withMessage('Name must be 60 characters or less.'),
    check('about')
        .exists({ checkFalsy: true })
        .isString()
        .isLength({ min: 50 })
        .notEmpty()
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true })
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .exists({ checkFalsy: true })
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .isString()
        .notEmpty()
        .isUppercase()
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
];

const properGroupAuth = async (req, _res, next) => {
    const group = req.group;
    if (group.organizerId !== req.user.id) {
        const err = new Error("Current User must be the organizer for the group");
        err.status = 403;
        return next(err);
    };
    next();
};

const validateGroupEventAttendenceEdit = async (req, res, next) => {
    const { userId, status } = req.body;
    const groupId = req.event.groupId;
    const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } })
    if (member?.status !== 'co-host' && member?.status !== 'Organizer') {
        const err = new Error("Current User must be Organizer or co-host of the group");
        err.title = "Action requires proper autherization."
        err.status = 403;
        return next(err);
    };
    const user = User.findByPk(userId);
    if (!user) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (status && status === 'pending') {
        const err = new Error("Bad Request");
        err.errors = { "status": "Cannot change an attendance status to pending" }
        err.status = 400;
        return next(err);
    }
    next();
};

const groupMember = async (req, res, next) => {
    const groupId = req.event.groupId;
    const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } })
    if (member?.status !== 'co-host' && member?.status !== 'Organizer' && member?.status !== 'member') {
        const err = new Error("Current User must be a member of the group");
        err.title = "Action requires proper autherization."
        err.status = 403;
        return next(err);
    }
    next();
}

const properGroupEventAuth = async (req, res, next) => {
    const groupId = req.group.id;
    const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } });
    if (member?.status !== 'co-host' && member?.status !== 'Organizer') {
        const err = new Error("Current User must be the organizer or co-host for the group");
        err.title = "Action requires proper autherization."
        err.status = 403;
        return next(err);
    }
    next();
}

const validGroupId = async (req, _res, next) => {
    const group = await Group.findByPk(Number(req.params.id));
    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err);
    };
    req.group = group;
    return next();
};

const validateGroupEdit = [
    check('name')
        .optional()
        .notEmpty()
        .isString()
        .isLength({ max: 60 })
        .withMessage('Name must be 60 characters or less.'),
    check('about')
        .optional()
        .notEmpty()
        .isString()
        .isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .optional()
        .notEmpty()
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private')
        .optional()
        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .optional()
        .notEmpty()
        .isString()
        .withMessage('City is required'),
    check('state')
        .optional()
        .notEmpty()
        .isString()
        .isUppercase()
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    handleValidationErrors
];

const validVenueId = async (req, _res, next) => {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        return next(err);
    }
    req.venue = venue;
    return next();
}

const properVenueAuth = async (req, res, next) => {
    let groupId;
    if (req.group) groupId = req.group.id;
    if (req.venue) groupId = req.venue.groupId;
    const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } });
    if (member?.status !== 'co-host' && member?.status !== 'Organizer') {
        const err = new Error("Current User must be the organizer or co-host for the group");
        err.status = 403;
        return next(err);
    }
    next();
}

const validateVenueEdit = [
    check('address')
        .optional()
        .notEmpty()
        .isString()
        .withMessage('Street address is required'),
    check('city')
        .optional()
        .notEmpty()
        .isString()
        .withMessage('City is required'),
    check('state')
        .optional()
        .notEmpty()
        .isString()
        .isUppercase()
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    check('lat')
        .optional()
        .notEmpty()
        .isDecimal()
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .optional()
        .notEmpty()
        .isDecimal()
        .withMessage('Longitude must be within -180 and 180'),
    handleValidationErrors
];

const validateVenueCreate = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .isUppercase()
        .isLength({ min: 2, max: 2 })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal()
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal()
        .withMessage('Longitude must be within -180 and 180'),
    handleValidationErrors
];

const methodError = (_req, _res, next) => {
    const err = new Error('Not a valid request method.');
    err.title = "Invalid method";
    err.status = 405;
    return next(err);
}

const validEventId = async (req, _res, next) => {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
        const err = new Error("Event couldn't be found");
        err.title = "No Event"
        err.status = 404;
        return next(err);
    }
    req.event = event;
    return next();
}

const validateEventCreate = [
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('capacity')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt()
        .isNumeric()
        .withMessage('Capacity must be an integer'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDecimal()
        .withMessage('Price is invalid'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isString()
        .withMessage('Description is required'),
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isAfter(`${new Date()}`)
        .withMessage('Start date must be in the future'),
    handleValidationErrors
];

const properEventImageAuth = async (req, _res, next) => {
    const { user, event } = req;
    const attendee = await Attendee.findOne({
        where: [
            { userId: user.id },
            { eventId: event.id }
        ]
    });
    if (!attendee.status === 'attendee' || !attendee.status === 'host' || !attendee.status === 'co-host') {
        const err = new Error('Requires proper authorization');
        err.status = 403;
        return next(err);
    };
    next();
};

const properEventEditAuth = async (req, res, next) => {
    const event = req.event;
    const member = await Member.findOne({
        where: [
            { groupId: event.groupId },
            { userId: req.user.id }]
    });
    if (!member?.status || !member.status === 'Organizer' && !member.status === 'co-host') {
        const err = new Error('Not authorized to edit this event.');
        err.status = 403;
        return next(err);
    }
    next();
};

const validateEventEdit = [
    check('name')
        .optional()
        .notEmpty()
        .isString()
        .isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type')
        .optional()
        .notEmpty()
        .isIn(['Online', 'In person'])
        .withMessage('Type must be Online or In person'),
    check('capacity')
        .optional()
        .notEmpty()
        .isInt()
        .isNumeric()
        .withMessage('Capacity must be an integer'),
    check('price')
        .optional()
        .notEmpty()
        .isDecimal()
        .withMessage('Price is invalid'),
    check('description')
        .optional()
        .notEmpty()
        .isString()
        .withMessage('Description is required'),
    check('startDate')
        .optional()
        .notEmpty()
        .isAfter(`${new Date()}`)
        .withMessage('Start date must be in the future'),
    handleValidationErrors
];

const properRemoveAttendanceAuth = async (req, res, next) => {
    const currentId = req.user.id;
    const { id, userId } = req.params;
    const event = await Event.findByPk(Number(id), { include: [Group, User] });
    if (currentId !== Number(userId) && currentId !== event.Group.id) {
        const err = new Error('Current User must be the Organizer of the group, or the user whose attendance is being deleted');
        err.status = 400;
        return next(err);
    }
    const user = await User.findByPk(Number(userId));
    if (!user) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        return next(err);
    }
    const attendance = event.Users.map(user => user.toJSON());
    const check = attendance.filter(user => {
        return user.id === Number(userId)
    });
    if (!check.length) {
        const err = new Error("Attendance does not exist for this User");
        err.status = 404;
        return next(err);
    }
    event.Users = check;
    req.event = event;
    next();
};

const validGroupImage = async (req, res, next) => {
    const id = Number(req.params.id);
    const image = await GroupImage.findByPk(id);
    if (!image) {
        const err = new Error("Group Image couldn't be found");
        err.status = 404;
        return next(err);
    };
    const group = await Member.findOne({
        where: [
            { groupId: Number(image.groupId) },
            { userId: Number(req.user.id) },
            { status: { [Op.or]: ['Organizer', 'co-host'] } }
        ]
    });
    if (!group) {
        const err = new Error('Current user must be the Organizer or co-host of the Group');
        err.status = 403;
        return next(err);
    };
    req.image = image;
    next();
};

module.exports = {
    notFound,
    sequelizeError,
    errorFormater,
    handleValidationErrors,
    validateLogin,
    validateSignup,
    validateGroupCreate,
    properGroupAuth,
    properGroupEventAuth,
    validGroupId,
    validateGroupEdit,
    validVenueId,
    properVenueAuth,
    validateVenueEdit,
    validateVenueCreate,
    methodError,
    validEventId,
    validateEventCreate,
    properEventImageAuth,
    properEventEditAuth,
    validateEventEdit,
    groupMember,
    validateGroupEventAttendenceEdit,
    properRemoveAttendanceAuth,
    validGroupImage
};
