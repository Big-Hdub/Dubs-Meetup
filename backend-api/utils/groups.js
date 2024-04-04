const { Group, GroupImage, Member, User, Venue } = require('../db/models');

const findAllGroups = async () => {
    const groups = await Group.findAll({
        include: {
            model: GroupImage,
            require: false,
            as: 'previewImage',
        },
    });
    return groups;
};

const findOrganizersGroups = async (id) => {
    const groups = await Group.findAll({
        where: { organizerId: id },
        include: {
            model: GroupImage,
            require: false,
            as: 'previewImage',
        },
    });
    return groups;
};

const formatGroups = (groups) => {
    return Promise.all(groups.map(async group => {
        const numMembers = await Member.count({
            where: { groupId: group.id }
        });
        const preview = group.previewImage.filter(image => image.preview === true)[0]?.url
        return {
            ...group.toJSON(),
            numMembers,
            previewImage: preview || null
        };
    }));
};

const getGroups = async (req, res) => {
    const groups = await findAllGroups();
    const formattedGroups = await formatGroups(groups);
    res.json({ Groups: formattedGroups });
};

const getCurrentGroups = async (req, res) => {
    const { user } = req;
    const groups = await findOrganizersGroups(Number(user.id));
    const formattedGroups = await formatGroups(groups);
    res.json({ Groups: formattedGroups });
};

const findGroupById = async (groupObj) => {
    const group = groupObj.toJSON();
    group.numMembers = await Member.count({ where: { groupId: group.id } })
    group.GroupImages = await GroupImage.findAll({
        where: { groupId: group.id },
        attributes: ['id', 'url', 'preview']
    });
    group.Organizer = await User.findOne({
        where: { id: group.organizerId },
        attributes: ['id', 'firstName', 'lastName']
    });
    group.Venues = await Venue.findAll({
        where: { groupId: group.id },
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'Events']
        }
    });
    return group;
};

const getGroupById = async (req, res) => {
    const group = await findGroupById(req.group);
    res.json(group);
};

const createGroup = async (req, res) => {
    const groupObj = req.body;
    const { user } = req;
    groupObj.organizerId = Number(user.id);
    const newGroup = await Group.create(groupObj);
    await Member.create({
        userId: user.id,
        groupId: newGroup.id,
        status: "Organizer"
    });
    res.json(newGroup);
};

const createGroupImage = async (req, res) => {
    const imageObj = req.body;
    imageObj.groupId = Number(req.params.id);
    const groupImage = await GroupImage.create(imageObj);
    res.json({
        id: groupImage.id,
        url: groupImage.url,
        preview: groupImage.preview
    });
};

const editGroup = async (req, res) => {
    const group = req.group;
    await group.update(req.body);
    res.json(group);
};

const deleteGroup = async (req, res, next) => {
    const group = req.group;
    group.destroy();
    res.json({
        message: "Successfully deleted"
    });
};

const deleteGroupImage = async (req, res, next) => {
    const image = req.image;
    image.destroy();
    res.json({
        "message": "Successfully deleted"
    })
};

module.exports = {
    getGroups,
    getCurrentGroups,
    getGroupById,
    createGroup,
    createGroupImage,
    editGroup,
    deleteGroup,
    deleteGroupImage
};
