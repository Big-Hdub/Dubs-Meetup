'use strict';

const { EventImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await EventImage.bulkCreate(eventImages, { validate: true })
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    })
  }
};
