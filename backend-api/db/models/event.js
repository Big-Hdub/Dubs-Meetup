'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.hasMany(
        models.EventImage, {
        foreignKey: 'eventId',
        as: 'previewImage',
        onDelete: 'cascade'
      });
      Event.hasMany(
        models.EventImage, {
        foreignKey: 'eventId',
        onDelete: 'cascade'
      });
      Event.belongsToMany(
        models.User, {
        through: 'Attendees',
        foreignKey: 'eventId',
        otherKey: 'userId',
        onDelete: 'cascade'
      })
      Event.belongsTo(
        models.Group, {
        foreignKey: 'id',
        onDelete: 'cascade'
      })
      Event.belongsTo(
        models.Venue, {
        foreignKey: 'id',
        onDelete: 'cascade'
      })
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Must be an integer of Venue id"
        },
        isInt: {
          msg: "Must be an integer of Venue id"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 5,
          msg: "Cannot have less than 5 characters."
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Online', 'In person']],
          msg: 'Must be "Online" or "In person"'
        }
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Must be greater than 0."
        },
        isNumeric: {
          msg: "Must be an integer"
        },
        isInt: {
          msg: "Must be an integer"
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: [6, 2],
          msg: "Must be a decimal in money format."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      // afterStart(val) {
      //   if (val < this.startDate) throw new Error("End date neeeds to be after start date.")
      // }
      // }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      // afterStart(val) {
      //   if (val < this.startDate) throw new Error("End date neeeds to be after start date.")
      // }
      // }
    }
  }, {
    sequelize,
    modelName: 'Event',
    indexes: [
      {
        unique: true,
        fields: ['groupId', 'venueId', 'startDate', 'endDate']
      }]
  });
  return Event;
};
