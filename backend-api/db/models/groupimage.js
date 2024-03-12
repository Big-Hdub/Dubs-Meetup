'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    static associate(models) {
      GroupImage.belongsTo(
        models.Group, {
        foreignKey: 'groupId'
      })
    }
  }
  GroupImage.init({
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
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: "Must be a valid Url." }
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: [[true, false]]
      }
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
  });
  return GroupImage;
};
