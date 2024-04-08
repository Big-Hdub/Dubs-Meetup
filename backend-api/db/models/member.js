'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(
        models.User, {
        foreignKey: 'userId',
        as: 'Membership'
      })
    }
  }
  Member.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Must be an integer of Group id"
        },
        isInt: {
          msg: "Must be an integer of Group id"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: {
          args: [['Organizer', 'co-host', 'member', 'pending']],
          msg: 'Must be "co-host", "member, or "pending"'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
