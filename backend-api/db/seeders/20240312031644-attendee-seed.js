'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Attendee } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Attendees';
options.validate = true;

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
  },
  {
    eventId: 2,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 2,
    userId: 3
  },
  {
    eventId: 1,
    userId: 4,
    status: 'waitlist'
  },
  {
    eventId: 2,
    userId: 2,
    status: 'pending'
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Attendee.bulkCreate(attendees, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    }, {});
  }
};
