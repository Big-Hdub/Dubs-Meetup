const { Member, User } = require('../db/models');
const { Op } = require("sequelize");

const getMembers = async (req, res) => {
    const { group } = req;
    console.log(req.user)
    const auth = await Member.findOne({
        where: {
            userId: Number(req.user.id),
        }
    });
    let members;
    if (auth?.status && auth.status === 'Organizer' || auth.status === 'co-host') {
        members = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Member,
                attributes: ['status'],
                as: 'Membership',
                where: { groupId: Number(group.id) },
            }
        })
    } else {
        members = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Member,
                attributes: ['status'],
                as: 'Membership',
                where: {
                    where: { groupId: Number(group.id) },
                    [Op.or]: [{ status: 'co-host' },
                    { status: 'member' }]
                }
            }
        })
    }
    res.json(members)
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
    const newMember = await Member.create({
        userId: userId,
        groupId: groupId
    });
    res.json({
        memberId: newMember.id,
        status: newMember.status
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
    const memberToEdit = await Member.findByPk(Number(edit.memberId));
    if (!memberToEdit) {
        const err = new Error('Membership between the user and the group does not exist');
        err.status = 404;
        return next(err);
    }
    if (edit?.status === 'member') {
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
    const { memberId } = req.params;
    const group = req.group;
    const userId = Number(req.user.id);
    const check = await Member.findOne({
        where: {
            groupId: group.id,
            userId: userId
        }
    });
    const member = await Member.findByPk(Number(memberId));
    if (!member) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        return next(err);
    }
    if (member.userId === userId || check?.status === 'Organizer') {
        member.destroy();
        res.json({
            "message": "Successfully deleted membership from group"
        });
    } else {
        const err = new Error("Membership does not exist for this User")
        err.status = 404;
        return next(err);
    }
};

module.exports = {
    getMembers,
    requestMembership,
    editMembership,
    deleteMembership
}
