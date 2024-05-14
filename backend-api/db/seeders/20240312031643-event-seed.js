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
    startDate: new Date('2024-05-08 12:00:00 -08:00'),
    endDate: new Date('2024-06-08 12:00:00 -08:00')
  },
  {
    groupId: 1,
    venueId: 2,
    name: 'FF marathon',
    type: 'Online',
    capacity: 200,
    price: 9.99,
    description: 'A warrior of light time',
    startDate: new Date('2024-05-08 12:00:00 -08:00'),
    endDate: new Date('2024-06-08 12:00:00 -08:00')
  },
  {
    groupId: 2,
    venueId: 1,
    name: 'Fishing time',
    type: 'In person',
    capacity: 4,
    price: 0,
    description: 'Fishing on the Ocean with family.  Stock the freezer with Salmon, Halibut, and Lingcod.',
    startDate: new Date('2024-05-08 12:00:00 -08:00'),
    endDate: new Date('2024-06-08 12:00:00 -08:00')
  },
  {
    groupId: 2,
    venueId: 2,
    name: 'Lord of the rings marathon',
    type: 'Online',
    capacity: 200,
    price: 9.99,
    description: 'The battles of middle earth.',
    startDate: new Date('2024-05-08 12:00:00 -08:00'),
    endDate: new Date('2024-06-08 12:00:00 -08:00')
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
