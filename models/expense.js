'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    cash: DataTypes.INTEGER,
    note: DataTypes.STRING
  }, {});

  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {foreignKey: 'userId'})
    Expense.belongsTo(models.Category, {foreignKey: 'categoryId'})
  };
  return Expense;
};