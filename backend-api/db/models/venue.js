'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    static associate(models) {
      Venue.belongsToMany(
        models.Group, {
        through: 'Events',
        foreignKey: 'venueId',
        otherKey: 'groupId',
        onDelete: 'SET NULL'
      })
      Venue.belongsTo(
        models.Group, {
        foreignKey: 'groupId',
        onDelete: 'cascade'
      })
    }
  }
  Venue.init({
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
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCapitalized(val) {
          if (val[0] !== val[0].toUpperCase()) throw new Error('Must capitalize city')
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUppercase: true,
        len: [2, 2]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: [10, 7],
          msg: "needs to be a valid decimal"
        },
        min: {
          args: -90,
          msg: "minimum -90"
        },
        max: {
          args: 90,
          msg: "maximum 90"
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: {
          args: [10, 7],
          msg: "needs to be a valid decimal"
        },
        min: {
          args: -180,
          msg: "minimum -180"
        },
        max: {
          args: 180,
          msg: "maximum 180"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Venue',
    indexes: [
      {
        unique: true,
        fields: ['groupId', 'address', 'city', 'state']
      }]
  });
  return Venue;
};
