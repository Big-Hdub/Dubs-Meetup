const { validationResult, check } = require('express-validator');
const { Event, Group, Venue, EventImage, Attendee } = require('../db/models');

const getEvents = async (req, res) => {
    let { page, size, name, type, startDate } = req.query;
    // console.log(page, size, name, type, startDate)

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page) || page < 1 || page > 10) page = 1;
    if (Number.isNaN(size) || size < 1 || size > 20) size = 20;

    const where = {};
    const pagination = {};
    pagination.limit = size;
    pagination.offset = size * (page - 1);
    if (name) where.name = name;
    if (type) where.type = type;
    if (startDate) where.startDate = startDate;

    let events = await Event.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: EventImage,
            attributes: ['url'],
            where: { preview: true },
            as: 'previewImage',
            required: false
        },
        {
            model: Group,
            attributes: ['id', 'name', 'city', 'state'],
            required: false
        },
        {
            model: Venue,
            attributes: ['id', 'city', 'state'],
            required: false
        }],
        where,
        ...pagination
    });
    events = await Promise.all(events.map(async event => {
        const numAttending = await Attendee.count({
            where: {
                eventId: event.id,
                status: 'attending'
            }
        });
        return {
            ...event.toJSON(),
            numAttending,
            Group: event.Group || null,
            Venue: event.Venue || null,
            previewImage: event.previewImage[0]?.url || null
        };
    }));
    res.json({
        Events: events,
        page: page,
        size: size
    });
};

const getEventsByGroupId = async (req, res, next) => {
    const group = req.group;
    let events = await Event.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { groupId: group.id },
        include: [{
            model: EventImage,
            attributes: ['url'],
            where: { preview: true },
            as: 'previewImage',
            required: false
        },
        {
            model: Group,
            attributes: ['id', 'name', 'city', 'state'],
            required: false
        },
        {
            model: Venue,
            attributes: ['id', 'city', 'state'],
            required: false
        }]
    });
    events = await Promise.all(events.map(async event => {
        const numAttending = await Attendee.count({
            where: {
                eventId: event.id,
                status: 'attending'
            }
        });
        return {
            ...event.toJSON(),
            numAttending,
            Group: event.Group || null,
            Venue: event.Venue || null,
            previewImage: event.previewImage[0]?.url || null
        };
    }));
    if (!events.length) {
        const err = new Error("No events found for that group.");
        err.title = "No events"
        err.status = 404;
        return next(err);
    }
    res.json(events);
}

const getEventByEventId = async (req, res, next) => {
    let event = await Event.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: { id: req.params.id },
        include: [{
            model: EventImage,
            attributes: ['id', 'url', 'preview'],
            required: false
        },
        {
            model: Group,
            attributes: ['id', 'name', 'private', 'city', 'state'],
            required: false
        },
        {
            model: Venue,
            attributes: ['id', 'address', 'city', 'state', 'lat', 'lng'],
            required: false
        }]
    });
    event = {
        ...event.toJSON(),
        numAttending: await Attendee.count({
            where: {
                eventId: event.id,
                status: 'attending'
            }
        })
    }
    res.json(event);
}

const createEvent = async (req, res, next) => {
    const eventObj = req.body;
    const venue = await Venue.findByPk(eventObj.venueId)
    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        return next(err);
    }
    eventObj.groupId = Number(req.params.id);
    const startDate = new Date(eventObj.startDate);
    const endDate = new Date(eventObj.endDate);
    if (startDate.getTime() > endDate.getTime()) {
        const err = new Error('Bad request');
        err.title = 'Bad request';
        err.errors = { "endDate": "End date is less than start date" };
        err.status = 400;
        return next(err);
    }
    const newEvent = await Event.create(eventObj);
    res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate
    });
};

const createEventImage = async (req, res) => {
    const { body } = req;
    body.eventId = Number(req.params.id);
    const newImage = await EventImage.create(body);
    res.json(newImage);
};

const editEvent = async (req, res, next) => {
    const { body, event } = req;
    let startDate;
    let endDate;
    body.startDate ? startDate = new Date(body.startDate) : startDate = new Date(event.startDate);
    body.endDate ? endDate = new Date(body.endDate) : endDate = new Date(event.endDate);
    if (startDate.getTime() > endDate.getTime()) {
        const err = new Error('Bad request');
        err.title = 'Bad request';
        err.errors = { "endDate": "End date is less than start date" };
        err.status = 400;
        return next(err);
    }
    if (body.venueId) {
        const venue = await Venue.findByPk(body.venueId);
        if (!venue) {
            const err = new Error("Venue couldn't be found");
            err.status = 404;
            return next(err);
        } else if (venue.groupId !== event.groupId) {
            const err = new Error("Venue doesn't belong to group");
            err.status = 400;
            err.title = "Bad Request"
            return next(err);
        }
    }
    const newEvent = await event.update(body);
    res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate
    });
};

const deleteEvent = async (req, res) => {
    const event = req.event;
    await event.destroy();
    res.json({ "message": "Successfully deleted" })
};

const deleteEventImage = async (req, res) => {
    const image = req.image;
    await image.destroy();
    res.json({
        "message": "Successfully deleted"
    });
};

module.exports = {
    getEvents,
    getEventsByGroupId,
    getEventByEventId,
    createEvent,
    createEventImage,
    editEvent,
    deleteEvent,
    deleteEventImage
}
