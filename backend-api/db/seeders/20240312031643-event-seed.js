'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Events';
options.validate = true;

const events = [
  {
    groupId: 1,
    venueId: 1,
    name: 'Dubs Tourney',
    type: 'In person',
    capacity: 20,
    price: 89.99,
    description: 'Fun in the sun',
    startDate: new Date(new Date('2024-04-08 12:00:00 +00:00').toISOString()),
    endDate: new Date(new Date('2024-05-08 12:00:00 +00:00').toISOString())
  },
  {
    groupId: 1,
    venueId: 2,
    name: 'FF marathon',
    type: 'Online',
    capacity: 200,
    price: 9.99,
    description: 'A warrior of light time',
    startDate: new Date(new Date('2024-05-08 12:00:00.000 +00:00').toISOString()),
    endDate: new Date(new Date('2024-06-08 12:00:00.000 +00:00').toISOString())
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Event.bulkCreate(events, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dubs Tourney', 'FF marathon'] }
    }, {});
  }
};
