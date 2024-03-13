'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.belongsTo(
        models.User, {
        foreignKey: "organizerId",
        as: 'Organizer'
      })
      Group.hasMany(
        models.Venue, {
        foreignKey: "groupId"
      })
      Group.hasMany(
        models.GroupImage, {
        foreignKey: "groupId",
        as: 'previewImage'
      })
      Group.hasMany(
        models.GroupImage, {
        foreignKey: "groupId"
      })
      Group.belongsToMany(
        models.User, {
        through: 'Members',
        foreignKey: 'groupId',
        otherKey: 'userId'
      })
      Group.belongsToMany(
        models.Venue, {
        through: 'Events',
        foreignKey: 'groupId',
        otherKey: 'venueId'
      })
    }
  }
  Group.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    organizerId: {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: {
          args: 60,
          msg: "Cannot have more than 60 characters."
        }
      }
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: 50,
          msg: 'Must have at least 50 characters.'
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
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase(val) {
          if (val[0].toUpperCase() !== val[0]) throw new Error("Need to capitalize City.")
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: {
          msg: "State must be all caps."
        },
        len: {
          args: [2, 2],
          msg: "State must be abbreviated."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
