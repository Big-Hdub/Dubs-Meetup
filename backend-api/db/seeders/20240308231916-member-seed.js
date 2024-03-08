'use strict';

const { User, Group, Member } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const members = [
  {
    userId: 1,
    groupId: 1,
    status: 'co-host'
  },
  {
    userId: 1,
    groupId: 2,
    status: 'co-host'
  },
  {
    userId: 2,
    groupId: 1,
    status: 'member'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Member.bulkCreate(members, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Members';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
