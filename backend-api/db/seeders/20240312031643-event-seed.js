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
    venueId: null,
    name: 'Demo-user\'s first event',
    type: 'Online',
    capacity: 200,
    price: 0,
    description: 'Demo event to show functionality of events to the demo user.',
    startDate: new Date('2024-05-24 12:00:00 -08:00'),
    endDate: new Date('2024-05-25 12:00:00 -08:00')
  },
  {
    groupId: 1,
    venueId: 3,
    name: 'Demo-user\'s second event',
    type: 'In person',
    capacity: 200,
    price: 59.99,
    description: 'Demo event to show functionality of events to the demo user.',
    startDate: new Date('2025-05-24 12:00:00 -08:00'),
    endDate: new Date('2025-05-25 12:00:00 -08:00')
  },
  {
    groupId: 2,
    venueId: 2,
    name: 'Hdub\'s Level up party',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Let\'s celebrate Harry\'s birthday together.  Cake, ice cream, and family.  A day of celebrating year 43!!',
    startDate: new Date('2024-06-26 0:00:00 -08:00'),
    endDate: new Date('2024-06-26 24:00:00 -08:00')
  },
  {
    groupId: 2,
    venueId: 2,
    name: 'Hdub\'s graduation party',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Let\'s celebrate Harry\'s graduation!!!  It\'s been a long hard year of school, so time to celebrate the completion of it.',
    startDate: new Date('2024-09-08 18:00:00 -08:00'),
    endDate: new Date('2024-09-08 24:00:00 -08:00')
  },
  {
    groupId: 3,
    venueId: 1,
    name: 'Fishing and fireworks',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Start of fishing season on the ocean for Salmon.  Fireworks as far as the eye can see for the 4th of July on the beach.  A great time for a family get together!',
    startDate: new Date('2024-07-02 12:00:00 -08:00'),
    endDate: new Date('2024-07-06 24:00:00 -08:00')
  },
  {
    groupId: 3,
    venueId: 1,
    name: 'Fishing and fireworks',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Start of fishing season on the ocean for Salmon.  Fireworks as far as the eye can see for the 4th of July on the beach.  A great time for a family get together!',
    startDate: new Date('2023-07-02 12:00:00 -08:00'),
    endDate: new Date('2023-07-06 24:00:00 -08:00')
  },
  {
    groupId: 3,
    venueId: 1,
    name: 'Fishing and fireworks',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Start of fishing season on the ocean for Salmon.  Fireworks as far as the eye can see for the 4th of July on the beach.  A great time for a family get together!',
    startDate: new Date('2022-07-02 12:00:00 -08:00'),
    endDate: new Date('2022-07-06 24:00:00 -08:00')
  },
  {
    groupId: 3,
    venueId: 1,
    name: 'Fishing and fireworks',
    type: 'In person',
    capacity: 20,
    price: 0,
    description: 'Start of fishing season on the ocean for Salmon.  Fireworks as far as the eye can see for the 4th of July on the beach.  A great time for a family get together!',
    startDate: new Date('2021-07-02 12:00:00 -08:00'),
    endDate: new Date('2021-07-06 24:00:00 -08:00')
  },
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
