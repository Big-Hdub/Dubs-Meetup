'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Member.init({
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
          args: [['co-host', 'member', 'pending']],
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
