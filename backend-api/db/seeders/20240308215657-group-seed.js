'use strict';

const { Group } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const groups = [
  {
    organizerId: 1,
    name: 'Dubs clan',
    about: 'All the dubs in Wenatchee, WA: Harry, Sarah, Leilani, Harrison, Kumiko',
    type: 'In person',
    private: true,
    city: 'Wenatchee',
    state: 'WA'
  },
  {
    organizerId: 1,
    name: 'Volleyball',
    about: 'Volleyball club in Wenatchee, WA.  Join in the hard hitting fun every time we do a tournament.',
    type: 'In person',
    private: true,
    city: 'Wenatchee',
    state: 'WA'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Group.bulkCreate(groups, { validate: true });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dubs clan'] }
    }, {});
  }
};
