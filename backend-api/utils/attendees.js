const { Op } = require('sequelize');
const { Attendee, Member, User } = require('../db/models');

const getAttendees = async (req, res, next) => {
    const { id, groupId } = req.event;
    let attendees;
    if (req.user) {
        const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } });
        if (member?.status === 'co-host' || member?.status === 'Organizer') {
            attendees = await User.findAll({
                include: {
                    model: Attendee,
                    as: 'Attendance',
                    where: [
                        { eventId: id },
                        { status: { [Op.or]: ['host', 'co-host', 'attending', 'waitlist'] } }
                    ],
                    attributes: ['status']
                },
                attributes: ['id', 'firstName', 'lastName'],
            });
        } else {
            attendees = await User.findAll({
                include: {
                    model: Attendee,
                    as: 'Attendance',
                    where: [
                        { eventId: id },
                        { status: { [Op.or]: ['host', 'co-host', 'attending'] } }
                    ],
                    attributes: ['status']
                },
                attributes: ['id', 'firstName', 'lastName'],
            });
        };
    }
    if (!attendees) {
        attendees = await User.findAll({
            include: {
                model: Attendee,
                as: 'Attendance',
                where: [
                    { eventId: id },
                    { status: { [Op.or]: ['host', 'co-host', 'attending'] } }
                ],
                attributes: ['status']
            },
            attributes: ['id', 'firstName', 'lastName'],
        });
    };
    const response = {}
    response.Attendees = attendees
    res.json(response);
}

const applyAttendance = async (req, res, next) => {
    const userId = req.user.id;
    const id = Number(req.params.id)
    const check = await Attendee.findOne({ where: [{ userId: userId }, { eventId: id }] });
    if (check?.status === 'pending') {
        const err = new Error('Attendance has already been requested');
        err.status = 400;
        return next(err);
    } else if (check?.status) {
        const err = new Error('User is already an attendee of the event');
        err.status = 400;
        return next(err);
    } else {
        const newAttendee = await Attendee.create({
            userId: userId,
            eventId: id
        })
        res.json({
            userId: newAttendee.userId,
            status: newAttendee.status
        });
    }
};

const editAttendance = async (req, res, next) => {
    const { userId, status } = req.body;
    const eventId = Number(req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
        const err = new Error("User couln't be found");
        err.status = 404;
        return next(err)
    }
    const attendance = await Attendee.findOne({
        where: [{ userId: userId }, { eventId: eventId }],
        attributes: ['id', 'eventId', 'userId', 'status']
    });
    if (!attendance) {
        const err = new Error('Attendance between the user and the event does not exist');
        err.status = 404;
        return next(err);
    }
    await attendance.update({ status: status });
    res.json({
        id: attendance.id,
        eventId: attendance.eventId,
        userId: attendance.userId,
        status: attendance.status
    });
};

const removeAttendee = async (req, res) => {
    const { attendee } = req;
    attendee.destroy();
    res.json({
        "message": "Successfully deleted attendance from event"
    });
};

module.exports = {
    getAttendees,
    applyAttendance,
    editAttendance,
    removeAttendee
};
