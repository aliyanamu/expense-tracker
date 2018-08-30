'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'User name is required'},
        isUnique: function(value, next) {
          User.find({
            where: {userName: value},
            id: {[op.ne]: this.id}
          }).then(function(data){

            if (data) return next(`User name is already used`)
            else next()
          })
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      isEmail: {
        args: true,
        msg: 'Must be a valid email address'
      },
      validate: {
        notEmpty: {msg: 'Email is required'},
        isUnique: function(value, next) {
          User.find({
            where: {email: value},
            id: {[op.ne]: this.id}
          }).then(function(data){

            if (data) return next(`Email is already used`)
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