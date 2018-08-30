'use strict';

const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Username is required'},
        isUnique: function(value, next) {
          User.findOne({
            where: {
              userName: value,
              id: {[op.ne]: this.id}
            }
          }).then(function(data){
            if (data) next(`Username is already used`)
            else next()
          })
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Email is required'},
        isEmail: {
          args: true,
          msg: 'Must be a valid email address'
        },
        isUnique: function(value, next) {
          User.findOne({
            where: {
              email: value,
              id: {[op.ne]: this.id}
            }
          }).then(function(data){
            if (data) next(`Email is already used`)
            else next()
          })
        }
      }
    }
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.Category, {through: 'Expenses', foreignKey: 'categoryId'})
  };
  return User;
};