'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    static associate(models) {
      EventImage.belongsTo(
        models.Event, {
        foreignKey: 'EventId'
      })
    }
  }
  EventImage.init({
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
    modelName: 'EventImage',
  });
  return EventImage;
};
