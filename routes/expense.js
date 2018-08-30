const express = require('express'),
      router = express.Router(),
      Expense = require('../controllers/expense');

router
    //Show List per Date
    .get('/', Expense.list)

    //Add Expense
    // .get('/add/user/:uid', Expense.addExpense)
    // .post('/add/user/:uid', Expense.putExpense)

    //Edit Expense
    // .get('/edit/:id/user/:uid', Expense.editExpense)
    // .post('/edit/:id/user/:uid', Expense.updateExpense)

    //Delete Form
    // .get('/delete/:id/user/:uid', Expense.deleteExpense)

module.exports = router