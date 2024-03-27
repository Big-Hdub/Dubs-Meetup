'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendee extends Model {
    static associate(models) {
      Attendee.belongsTo(
        models.User, {
        foreignKey: 'userId',
        as: 'Attendance'
        // onDelete: 'cascade'
      })
    }
  }
  Attendee.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Must be an integer of Event id"
        },
        isInt: {
          msg: "Must be an integer of Event id"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Must be an integer of User id"
        },
        isInt: {
          msg: "Must be an integer of User id"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['attending', 'waitlist', 'pending']]
      }
    }
  }, {
    sequelize,
    modelName: 'Attendee',
  });
  return Attendee;
};
