'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
  };
  return Expense;
};