'use strict';
/** @type {import('sequelize-cli').Migration} */

const { GroupImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'GroupImages';
options.validate = true;

const groupImages = [
  {
    groupId: 1,
    url: 'https://dubs-meetup.onrender.com/api/images/dubs-log',
    preview: true
  },
  {
    groupId: 1,
    url: 'www.play.net/images/pic2.png',
    preview: false
  },
  {
    groupId: 1,
    url: 'www.play.net/images/pic3.png',
  },
  {
    groupId: 2,
    url: 'https://dubs-meetup.onrender.com/api/images/volleyball',
    preview: true
  }
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await GroupImage.bulkCreate(groupImages, options)
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
