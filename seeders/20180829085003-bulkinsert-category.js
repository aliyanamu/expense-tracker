'use strict';

const fs = require('fs')
const CatFile = fs.readFileSync('./categories.csv', 'utf-8').split('\n')
let arrCats = []

for (let i=1; i<CatFile.length; i++) {
  let single = CatFile[i].split(',')
  let obj = {}
  obj.id = single[0]
  obj.categoryName = single[1]
  obj.createdAt = new Date()
  obj.updatedAt = new Date()

  arrCats.push(obj)
}

console.log(arrCats)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', arrCats, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
