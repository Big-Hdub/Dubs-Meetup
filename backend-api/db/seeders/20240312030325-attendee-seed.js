'use strict';

const { Attendee } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const attendees = [
  {
    eventId: 1,
    userId: 1,
    status: 'attending'
  },
  {
    eventId: 2,
    userId: 1
  },
  {
    eventId: 1,
    userId: 2,
    status: 'waitlist'
  },
  {
    eventId: 1,
    userId: 3,
    status: 'pending'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Attendee.bulkCreate(attendees, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    }, {});
  }
};
