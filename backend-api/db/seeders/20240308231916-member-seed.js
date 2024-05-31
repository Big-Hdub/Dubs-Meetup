'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Member } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Members';
options.validate = true;

const members = [
  {
    userId: 1,
    groupId: 1,
    status: 'Organizer'
  },
  {
    userId: 2,
    groupId: 1,
    status: 'co-host'
  },
  {
    userId: 3,
    groupId: 1,
    status: 'member'
  },
  {
    userId: 4,
    groupId: 1,
    status: 'pending'
  },
  {
    userId: 2,
    groupId: 2,
    status: 'Organizer'
  },
  {
    userId: 3,
    groupId: 2,
    status: 'co-host'
  },
  {
    userId: 4,
    groupId: 2,
    status: 'member'
  },
  {
    userId: 5,
    groupId: 2,
    status: 'member'
  },
  {
    userId: 6,
    groupId: 2,
    status: 'member'
  },
  {
    userId: 2,
    groupId: 3,
    status: 'Organizer'
  },
  {
    userId: 3,
    groupId: 3,
    status: 'co-host'
  },
  {
    userId: 4,
    groupId: 3,
    status: 'member'
  },
  {
    userId: 5,
    groupId: 3,
    status: 'member'
  },
  {
    userId: 6,
    groupId: 3,
    status: 'member'
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Member.bulkCreate(members, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
