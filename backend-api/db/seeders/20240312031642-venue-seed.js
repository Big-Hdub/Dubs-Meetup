'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Venue } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Venues';
options.validate = true;

const venues = [
  {
    groupId: 1,
    address: '999 E. Western Ave.',
    city: 'Wenatchee',
    state: 'WA',
    lat: 82.9302563,
    lng: 32.1234534
  },
  {
    groupId: 2,
    address: '999 W. Brunson Ave.',
    city: 'Wenatchee',
    state: 'WA',
    lat: -82.9302563,
    lng: -32.1234534
  },
  {
    groupId: 1,
    address: '999 Stern Ave.',
    city: 'Wenatchee',
    state: 'WA',
    lat: 23.9302563,
    lng: 68.1234534
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Venue.bulkCreate(venues, options)
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      groupId: { [Op.in]: [1, 2] }
    })
  }
};
