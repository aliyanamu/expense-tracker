'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    cash: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: 'Invalid, amount can only consist of numbers'
        }
      }
    },
    note: DataTypes.STRING
  }, {});

  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {foreignKey: 'userId'})
    Expense.belongsTo(models.Category, {foreignKey: 'categoryId'})
  };
  return Expense;
};