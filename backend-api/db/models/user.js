'use strict';
const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(
        models.Group, {
        foreignKey: "organizerId",
        onDelete: 'cascade'
      })
      User.belongsToMany(
        models.Event, {
        through: 'Attendees',
        foreignKey: 'UserId',
        otherKey: 'eventId',
        onDelete: 'CASCADE'
      })
      User.belongsToMany(
        models.Group, {
        through: 'Members',
        foreignKey: 'userId',
        otherKey: 'groupId',
        onDelete: 'CASCADE'
      })
      User.belongsTo(
        models.Member, {
        foreignKey: 'id',
        as: 'Membership',
        onDelete: 'CASCADE'
      })
      User.hasMany(
        models.Attendee, {
        foreignKey: 'userId',
        as: 'Attendance'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(val) {
          if (Validator.isEmail(val)) throw new Error("Cannot be an email.")
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
