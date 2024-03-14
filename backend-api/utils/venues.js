const { Venue } = require('../db/models');

const getVenuesByGroupId = async (req, res, next) => {
    const group = req.group;
    const venues = await Venue.findAll({
        where: { groupId: group.id },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    })
    res.json(venues)
};

const createVenue = async (req, res, next) => {
    const createObj = req.body;
    createObj.groupId = Number(req.params.id)
    const venue = await Venue.create(createObj);
    res.json({
        id: venue.id,
        groupId: venue.groupId,
        address: venue.address,
        city: venue.city,
        state: venue.state,
        lat: venue.lat,
        lng: venue.lng
    })
}

const editVenue = async (req, res, next) => {
    const venue = req.venue;
    await venue.update(req.body);
    res.json({
        id: venue.id,
        groupId: venue.groupId,
        address: venue.address,
        city: venue.city,
        state: venue.state,
        lat: venue.lat,
        lng: venue.lng
    });
}

module.exports = {
    createVenue,
    getVenuesByGroupId,
    editVenue
}
