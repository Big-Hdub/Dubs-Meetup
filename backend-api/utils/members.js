const { Member, User } = require('../db/models');
const { Op } = require("sequelize");

const getMembers = async (req, res) => {
    const { group, user } = req;
    let members = await User.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        include: {
            model: Member,
            attributes: ['status'],
            as: 'Membership',
            where: { groupId: group.id }
        }
    })
    const response = {};
    response.Members = members;
    res.json(response);
};

const requestMembership = async (req, res, next) => {
    const groupId = Number(req.params.id);
    const userId = Number(req.user.id);
    if (isNaN(userId) || isNaN(groupId)) {
        const err = new Error('invalid user id or group id');
        err.status = 400;
        return next(err);
    };
    const check = await Member.findOne({
        where: {
            groupId: groupId,
            userId: userId
        }
    });
    if (check?.status === 'pending') {
        const err = new Error('Membership has already been requested');
        err.status = 400;
        return next(err);
    };
    if (check?.status) {
        const err = new Error('User is already a member of the group');
        err.status = 400;
        return next(err);
    };
    await Member.create({
        userId: userId,
        groupId: groupId
    });
    const newMember = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        include: {
            model: Member,
            attributes: ['status'],
            as: 'Membership',
            where: {
                groupId: groupId,
                userId: userId
            }
        }
    })
    res.json({
        id: newMember.id,
        firstName: newMember.firstName,
        lastName: newMember.lastName,
        Membership: { status: newMember.Membership.status }
    });
};

const editMembership = async (req, res, next) => {
    const groupId = Number(req.params.id);
    const userId = Number(req.user.id);
    const check = await Member.findOne({
        where: {
            groupId: groupId,
            userId: userId
        }
    });
    if (check?.status !== 'Organizer' && check?.status !== 'co-host') {
        const err = new Error('Not authorized to edit this member.');
        err.status = 403;
        return next(err);
    };
    const edit = req.body;
    const user = await User.findByPk(edit.memberId);
    if (!user) {
        const err = new Error('Validation Error');
        err.errors = { memberId: "User couldn't be found" }
        err.status = 400;
        return next(err);
    }
    const memberToEdit = await Member.findOne({
        where: {
            userId: Number(edit.memberId),
            groupId: groupId
        }
    });
    if (!memberToEdit) {
        const err = new Error('Membership between the user and the group does not exist');
        err.status = 404;
        return next(err);
    }
    if (check?.status === 'Organizer' && userId === memberToEdit.userId) {
        const err = new Error('Must promote someone to your place.');
        err.status = 403;
        return next(err);
    } else if (edit?.status === 'member') {
        await memberToEdit.update({
            status: edit.status
        });
    } else if (edit?.status === 'co-host') {
        if (check?.status !== 'Organizer') {
            const err = new Error('Not authorized to edit this member.');
            err.status = 403;
            return next(err);
        } else {
            await memberToEdit.update({
                status: edit.status
            });
        };
    } else if (edit?.status === 'Organizer') {
        if (check?.status !== 'Organizer') {
            const err = new Error('Not authorized to edit this member.');
            err.status = 403;
            return next(err);
        } else {
            await check.update({
                status: "co-host"
            })
            await memberToEdit.update({
                status: edit.status
            });
        };
    } else if (edit?.status === 'pending') {
        const err = new Error('Bad Request');
        err.status = 400;
        err.errors = { status: "Cannot change a membership to status of pending" };
        return next(err);
    }
    res.json({
        id: memberToEdit.id,
        groupId: memberToEdit.groupId,
        memberId: memberToEdit.userId,
        status: memberToEdit.status
    });
};

const deleteMembership = async (req, res, next) => {
    const memberId = Number(req.params.memberId);
    const group = req.group;
    const userId = Number(req.user.id);
    const user = await User.findByPk(memberId);
    if (!user) {
        const err = new Error("Validation Error");
        err.errors = { memberId: "User couldn't be found" }
        err.status = 400;
        return next(err);
    }
    const member = await Member.findOne({
        where: {
            userId: memberId,
            groupId: Number(group.id)
        }
    });
    if (!member) {
        const err = new Error("Membership does not exist for this User")
        err.status = 404;
        return next(err);
    }
    const check = await Member.findOne({
        where: {
            groupId: Number(group.id),
            userId: userId
        }
    });
    if (!check || check?.status !== 'Organizer' && userId !== memberId) {
        const err = new Error('Not authorized to delete this member.');
        err.status = 403;
        return next(err);
    }
    if (check?.status === 'Organizer' && userId === memberId) {
        const err = new Error('Must promote someone to your place first.');
        err.status = 403;
        return next(err);
    }
    if (member) {
        member.destroy();
        res.json({
            "message": "Successfully deleted membership from group."
        });
    }
};

module.exports = {
    getMembers,
    requestMembership,
    editMembership,
    deleteMembership
}
