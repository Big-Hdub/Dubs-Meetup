const { Group, GroupImage, Member, User, Venue } = require('../db/models');

const findAllGroups = () => {
    const groups = Group.findAll({
        include: {
            model: GroupImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            as: 'previewImage'
        },
    });
    return groups;
}

const findOrganizersGroups = (id) => {
    const groups = Group.findAll({
        where: { organizerId: id },
        include: {
            model: GroupImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            as: 'previewImage'
        },
    });
    return groups;
}

const findGroupById = (id) => {
    const group = Group.findOne({
        where: { id: id },
        include: [{
            model: GroupImage,
            attributes: ['id', 'url', 'preview'],
        }, {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
            as: 'Organizer'
        }, {
            model: Venue,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'Events']
            }
        }]
    });
    return group;
}

const formatGroups = (groups) => {
    return Promise.all(groups.map(async group => {
        const numMembers = await Member.count({
            where: { GroupId: group.id }
        });
        return {
            ...group.toJSON(),
            numMembers,
            previewImage: group.previewImage[0].url
        };
    }));
}

const getGroups = async (req, res) => {
    const groups = await findAllGroups();
    const formattedGroups = await formatGroups(groups)
    res.json({ Groups: formattedGroups })
}

const getCurrentGroups = async (req, res) => {
    const { user } = req;
    const groups = await findOrganizersGroups(user.id);
    const formattedGroups = await formatGroups(groups)
    res.json({ Groups: formattedGroups })
}

const getGroupById = async (req, res, next) => {
    const id = req.params.id;
    const group = await findGroupById(Number(id));
    if (!group) {
        const err = new Error("Group couldn't be found");
        err.status = 404;
        return next(err);
    }
    res.json(group);
}

const createGroup = async (req, res, next) => {
    const reqBody = req.body;
    if (!reqBody) {
        const err = new Error("Group couldn't be found");
        err.status = 400;
        return next(err);
    }
}

module.exports = {
    getGroups,
    getCurrentGroups,
    getGroupById,
    createGroup
}
