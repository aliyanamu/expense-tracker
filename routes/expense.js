const express = require('express'),
      router = express.Router(),
      ExpenseCtrl = require('../controllers/expense');

router
    //Show List per Date
    .get('/', ExpenseCtrl.list)

    //Add Expense
    // .get('/add', ExpenseCtrl.addExpense)
    // .post('/add', ExpenseCtrl.putExpense)

    //Edit Expense
    // .get('/edit/:id', ExpenseCtrl.editExpense)
    // .post('/edit/:id', ExpenseCtrl.updateExpense)

    //Delete Form
    // .get('/delete/:id', ExpenseCtrl.deleteExpense)

module.exports = router