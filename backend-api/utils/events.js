const { validationResult, check } = require('express-validator');
const { Event, Group, Venue, EventImage, Attendee } = require('../db/models');
const { Op } = require("sequelize");

const getEvents = async (req, res) => {
    let { page, size, name, type, startDate } = req.query;
    const response = {};
    const pagination = {};

    page = parseInt(page);
    size = parseInt(size);
    if (Number.isNaN(page) || page < 1) page = 1;
    if (Number.isNaN(size) || size < 1 || size > 20) size = 20;
    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const where = {};
    if (name) where.name = name.split("_").join(" ")
    if (type) where.type = type.split("_").join(" ");
    if (startDate) where.startDate = new Date(new Date(startDate).toISOString());

    let events = await Event.findAll({
        attributes: {
            exclude: ['capacity', 'price', 'description', 'createdAt', 'updatedAt']
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
            previewImage: event.previewImage[0]?.url || null,
            startDate: event.startDate.toLocaleString(),
            endDate: event.endDate.toLocaleString()
        };
    }));
    response.Events = events;
    response.page = page;
    response.size = size;
    res.json(response);
};

const getEventsByGroupId = async (req, res, next) => {
    const group = req.group;
    let events = await Event.findAll({
        attributes: {
            exclude: ['capacity', 'price', 'description', 'createdAt', 'updatedAt']
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
                status: { [Op.or]: ['host', 'co-host', 'attending'] }
            }
        });
        return {
            ...event.toJSON(),
            numAttending,
            Group: event.Group || null,
            Venue: event.Venue || null,
            previewImage: event.previewImage[0]?.url || null,
            startDate: event.startDate.toLocaleString(),
            endDate: event.endDate.toLocaleString()
        };
    }));
    if (!events.length) {
        const err = new Error("No events found for that group.");
        err.title = "No events"
        err.status = 404;
        return next(err);
    }
    res.json({
        Events: events
    });
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
            // required: false
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
                status: ['host', 'co-host', 'attending']
            }
        }),
        startDate: event.startDate.toLocaleString(),
        endDate: event.endDate.toLocaleString()
    }
    res.json(event);
}

const formatDecimal = num => {
    let dec = num.toString();
    if (dec.indexOf('.') !== -1) {
        const parts = dec.split('.');
        if (parts[1].length === 1) parts[1] += '0';
        dec = parts.join('.')
    } else dec += '.00';
    return dec;
}

const createEvent = async (req, res, next) => {
    const eventObj = req.body;
    const userId = Number(req.user.id);
    const venue = await Venue.findByPk(eventObj.venueId)
    if (!venue) {
        const err = new Error("Venue couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (typeof eventObj.price === 'number') eventObj.price = formatDecimal(eventObj.price);
    eventObj.groupId = Number(req.params.id);
    eventObj.startDate = new Date(new Date(eventObj.startDate).toISOString());
    eventObj.endDate = new Date(new Date(eventObj.endDate).toISOString());
    const newEvent = await Event.create(eventObj);
    await Attendee.create({
        eventId: newEvent.id,
        userId: userId,
        status: 'host'
    });
    res.json({
        id: newEvent.id,
        groupId: newEvent.groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        startDate: newEvent.startDate.toLocaleString(),
        endDate: newEvent.endDate.toLocaleString()
    });
};

const createEventImage = async (req, res) => {
    const { body } = req;
    body.eventId = Number(req.params.id);
    const newImage = await EventImage.create(body);
    res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    });
};

const editEvent = async (req, res, next) => {
    const { body, event } = req;
    let startDate;
    let endDate;
    if (typeof body.price === 'number') body.price = formatDecimal(body.price);
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
        startDate: newEvent.startDate.toLocaleString(),
        endDate: newEvent.endDate.toLocaleString()
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
