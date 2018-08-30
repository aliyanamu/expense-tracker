const express = require('express'),
      router = express.Router(),
      Ctrl = require('../controllers/ctrl');

router
    //Register
    // .get('/register', Ctrl.addUser)

    //Login
    // .get('/login', Ctrl.loginUser)
    // .post('/login', Ctrl.logoutUser)

    // .get('/user', Ctrl.findAll)
    
    //Dashboard - expenseList
    .get('/:id/expense', Ctrl.list)

    //Add Expense - addExpense
    .get('/:id/expense/add', Ctrl.addExpense)
    .post('/:id/expense/add', Ctrl.putExpense)

    //Edit Expense - editExpense
    .get('/:id/expense/edit/:eid', Ctrl.editExpense)
    .post('/:id/expense/edit/:eid', Ctrl.updateExpense)

    //Delete Expense
    .get('/:id/expense/delete/:eid', Ctrl.deleteExpense)

    //Show Report - expenseReport
    // .get('/:id/expense/overview', Ctrl.overview)

    //Show Profile - profile
    .get('/:id/profile', Ctrl.findUser)

    //Edit Profile - editUser
    .get('/:id/profile/edit', Ctrl.editUser)
    // .post('/:id/profile/edit', Ctrl.updateUser)

module.exports = router