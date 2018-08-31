'use strict';

const fs = require('fs')
const UserFile = fs.readFileSync('./users.csv', 'utf-8').split('\n')
let arrUsers = [], single

for (let i=1; i<UserFile.length; i++) {
  single = UserFile[i].split(',')
  let obj = {}
  obj.id = single[0]
  obj.userName = single[1]
  obj.password = single[2]
  obj.email = single[3]
  obj.createdAt = new Date()
  obj.updatedAt = new Date()

  arrUsers.push(obj)
  obj = {}
}

console.log(arrUsers)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', arrUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
