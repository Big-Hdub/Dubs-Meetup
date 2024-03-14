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
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    firstName: 'Kumiko',
    lastName: 'Wagner',
    email: 'user2@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password3')
  },
  {
    firstName: 'Leilani',
    lastName: 'Wagner',
    email: 'user3@user.io',
    username: 'FakeUser3',
    hashedPassword: bcrypt.hashSync('password3')
  }
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
