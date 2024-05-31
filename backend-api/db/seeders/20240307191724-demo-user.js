'use strict';
/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';
options.validate = true;

const demoUsers = [
  {
    firstName: 'demo',
    lastName: 'user',
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Harry',
    lastName: 'Wagner',
    email: 'hdub-bb@hotmail.com',
    username: 'Hdub',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Sarah',
    lastName: 'Wagner',
    email: 'sdub@dubs.com',
    username: 'Sdub',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Leilani',
    lastName: 'Wagner',
    email: 'leidub@dubs.com',
    username: 'Leidub',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Harrison',
    lastName: 'Wagner',
    email: 'lildub@dubs.com',
    username: 'Lildub',
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: 'Kumiko',
    lastName: 'Wagner',
    email: 'kdub@dubs.com',
    username: 'Kdub',
    hashedPassword: bcrypt.hashSync('password')
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(demoUsers, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3'] }
    }, {});
  }
};
