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
    url: 'https://dubs-meetup.onrender.com/api/images/knights',
    preview: true
  },
  {
    eventId: 2,
    url: 'https://dubs-meetup.onrender.com/api/images/knights',
    preview: true
  },
  {
    eventId: 3,
    url: 'https://dubs-meetup.onrender.com/api/images/finalFantasy',
    preview: true
  },
  {
    eventId: 4,
    url: 'https://dubs-meetup.onrender.com/api/images/finalFantasy',
    preview: true
  },
  {
    eventId: 5,
    url: 'https://dubs-meetup.onrender.com/api/images/sturgeon',
    preview: true
  },
  {
    eventId: 6,
    url: 'https://dubs-meetup.onrender.com/api/images/sturgeon',
    preview: true
  },
  {
    eventId: 7,
    url: 'https://dubs-meetup.onrender.com/api/images/sturgeon',
    preview: true
  },
  {
    eventId: 8,
    url: 'https://dubs-meetup.onrender.com/api/images/sturgeon',
    preview: true
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
    await queryInterface.bulkDelete(options, {
      eventId: { [Op.in]: [1, 2] }
    })
  }
};
