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
    .get('/user/:id/expense', Ctrl.list)

    //Add Expense - addExpense
    .get('/user/:id/expense/add', Ctrl.addExpense)
    .post('/user/:id/expense/add', Ctrl.putExpense)

    //Edit Expense - editExpense
    .get('/user/:id/expense/edit/:eid', Ctrl.editExpense)
    .post('/user/:id/expense/edit/:eid', Ctrl.updateExpense)

    //Delete Expense
    .get('/user/:id/expense/delete/:eid', Ctrl.editExpense)

    //Show Report - expenseReport
    .get('/user/:id/expense/overview', Ctrl.overview)

    //Show Profile - profile
    .get('/user/:id/profile', Ctrl.findUser)

    //Edit Profile - editUser
    .get('/user/:id/profile/edit', Ctrl.editUser)
    .post('/user/:id/profile/edit', Ctrl.updateUser)

module.exports = router