'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    categoryName: DataTypes.STRING
  }, {});
  
  Category.associate = function(models) {
    Category.belongsToMany(models.User, {through: 'Expenses', foreignKey: 'categoryId'})
  };
  return Category;
};