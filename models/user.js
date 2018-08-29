'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.belongsToMany(models.Category, {through: 'Expenses', foreignKey: 'categoryId'})
  };
  return User;
};