const { environment } = require('../config');
const isProduction = environment === 'production';
const { ValidationError } = require('sequelize');
const { validationResult, check } = require('express-validator');
const { Group } = require('../db/models');

const notFound = (_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
};

const sequelizeError = (err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
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
    }
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
    const group = await Group.findByPk(Number(req.params.id))
    console.log(group.organizerId, req.user.id)
    if (group.organizerId !== req.user.id) {
        const err = new Error("Current User mst be the organizer for the group");
        err.status = 403;
        return next(err);
    }
    next()
}

const validGroupId = async (req, _res, next) => {
    const group = Group.findByPk(Number(req.params.id));
    if (!group) {
        const err = new Error("Couldn't find a Group with the specified id");
        err.status = 404;
        return next(err);
    }
    return next();
}

module.exports = {
    notFound,
    sequelizeError,
    errorFormater,
    handleValidationErrors,
    validateLogin,
    validateSignup,
    validateGroupCreate,
    properGroupAuth,
    validGroupId
}
