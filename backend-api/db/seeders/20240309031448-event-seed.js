'use strict';

const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const events = [
  {
    groupId: 1,
    venueId: 1,
    name: 'Dubs Tourney',
    type: 'In person',
    capacity: 20,
    price: 89.99,
    description: 'Fun in the sun',
    startDate: '2024-04-08 12:00:00.000 +00:00',
    endDate: '2024-05-08 12:00:00.000 +00:00'
  },
  {
    groupId: 1,
    venueId: 1,
    name: 'FF marathon',
    type: 'Online',
    capacity: 200,
    price: 9.99,
    description: 'A warrior of light time',
    startDate: '2024-05-08 12:00:00.000 +00:00',
    endDate: '2024-06-08 12:00:00.000 +00:00'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Event.bulkCreate(events, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dubs Tourney', 'FF marathon'] }
    }, {});
  }
};
