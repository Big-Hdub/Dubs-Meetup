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
    status: 'host'
  },
  {
    eventId: 1,
    userId: 2,
    status: 'co-host'
  },
  {
    eventId: 1,
    userId: 3,
    status: 'attending'
  },
  {
    eventId: 1,
    userId: 4,
    status: 'waitlist'
  },
  {
    eventId: 2,
    userId: 2,
    status: 'host'
  },
  {
    eventId: 2,
    userId: 1,
    status: 'co-host'
  },
  {
    eventId: 2,
    userId: 3,
    status: 'co-host'
  },
  {
    eventId: 2,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 2,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 2,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 3,
    userId: 3,
    status: 'host'
  },
  {
    eventId: 3,
    userId: 2,
    status: 'co-host'
  },
  {
    eventId: 3,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 3,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 3,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 4,
    userId: 3,
    status: 'host'
  },
  {
    eventId: 4,
    userId: 2,
    status: 'co-host'
  },
  {
    eventId: 4,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 4,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 4,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 5,
    userId: 2,
    status: 'host'
  },
  {
    eventId: 5,
    userId: 3,
    status: 'co-host'
  },
  {
    eventId: 5,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 5,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 5,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 6,
    userId: 2,
    status: 'host'
  },
  {
    eventId: 6,
    userId: 3,
    status: 'co-host'
  },
  {
    eventId: 6,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 6,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 6,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 7,
    userId: 2,
    status: 'host'
  },
  {
    eventId: 7,
    userId: 3,
    status: 'co-host'
  },
  {
    eventId: 7,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 7,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 7,
    userId: 6,
    status: 'attending'
  },
  {
    eventId: 8,
    userId: 2,
    status: 'host'
  },
  {
    eventId: 8,
    userId: 3,
    status: 'co-host'
  },
  {
    eventId: 8,
    userId: 4,
    status: 'attending'
  },
  {
    eventId: 8,
    userId: 5,
    status: 'attending'
  },
  {
    eventId: 8,
    userId: 6,
    status: 'attending'
  },
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
