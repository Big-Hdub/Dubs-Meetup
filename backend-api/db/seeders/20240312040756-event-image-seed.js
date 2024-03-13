'use strict';
/** @type {import('sequelize-cli').Migration} */

const { EventImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'EventImages';
options.validate = true;

const eventImages = [
  {
    eventId: 1,
    url: 'www.play.net/images/pic.png',
    preview: true
  },
  {
    eventId: 1,
    url: 'www.play.net/images/pic2.png',
    preview: false
  },
  {
    eventId: 1,
    url: 'www.play.net/images/pic3.png',
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await EventImage.bulkCreate(eventImages, options)
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    })
  }
};
