const { Member } = require('../db/models');
const { Op } = require("sequelize");

const getMembers = async (req, res) => {
    const { group } = req;
    console.log(req.user)
    const auth = await Member.findOne({
        where: { userId: Number(req.user.id) }
    });
    let members;
    if (auth?.status && auth.status === 'Organizer' || auth.status === 'co-host') {
        members = await Member.findAll({ attributes: ['id', 'firstName', 'lastName', 'status'] })
        res.json(members)
    }
    res.json(auth)
}

module.exports = {
    getMembers
}
