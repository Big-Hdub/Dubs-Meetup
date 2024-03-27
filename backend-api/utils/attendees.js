const { Op } = require('sequelize');
const { Attendee, Member, User } = require('../db/models');

const getAttendees = async (req, res, next) => {
    const { id, groupId } = req.event;
    console.log(req.event.toJSON())
    console.log(`eventId: ${id}, groupId: ${groupId}, userId: ${req.user}`)
    let attendees;
    const member = await Member.findOne({ where: { userId: req.user.id, groupId: groupId } });
    if (member?.status !== 'co-host' && member?.status !== 'Organizer') {
        attendees = await User.findAll({
            include: {
                model: Attendee,
                as: 'Attendance',
                where: [
                    { eventId: id },
                    { status: { [Op.or]: ['attending', 'waitlist'] } }
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
                where: { eventId: id },
                attributes: ['status']
            },
            attributes: ['id', 'firstName', 'lastName'],
        });
    };
    res.json(attendees);
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
            memberId: newAttendee.id,
            status: newAttendee.status
        });
    }
};

module.exports = {
    getAttendees,
    applyAttendance
}
