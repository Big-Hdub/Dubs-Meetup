'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Group } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Groups';
options.validate = true;

const groups = [
  {
    organizerId: 1,
    name: 'Demo Group',
    about: 'Group for the demo login so logged in features can be seen.',
    type: 'In person',
    private: true,
    city: 'Wenatchee',
    state: 'WA'
  },
  {
    organizerId: 2,
    name: 'Dubs clan',
    about: 'All the dubs in Wenatchee, WA: Harry, Sarah, Leilani, Harrison, Kumiko',
    type: 'In person',
    private: true,
    city: 'Wenatchee',
    state: 'WA'
  },
  {
    organizerId: 2,
    name: 'Ocean Park Cabinittes',
    about: 'Family cabin at the ocean.  A great place to go for fishing, riding bikes, playing on the beach, clamming and oysters, Going to Jack\'s and Scoopers',
    type: 'In person',
    private: true,
    city: 'Ocean Park',
    state: 'WA'
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Group.bulkCreate(groups, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Dubs clan', 'Volleyball'] }
    }, {});
  }
};
