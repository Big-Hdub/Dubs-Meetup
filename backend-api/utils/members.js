const { Member, User } = require('../db/models');
const { Op } = require("sequelize");

const getMembers = async (req, res) => {
    const { group } = req;
    console.log(req.user)
    const auth = await Member.findOne({
        where: { userId: Number(req.user.id) }
    });
    let members;
    if (auth?.status && auth.status === 'Organizer' || auth.status === 'co-host') {
        members = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
            include: {
                model: Member,
                attributes: ['status'],
                as: 'Membership'
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
    if (isNaN(userId) || isNaN(groupId)) { }
}

module.exports = {
    getMembers,
    requestMembership
}
