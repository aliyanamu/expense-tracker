const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      Ctrl = require('../controller');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('homePage')
    // res.status(200).json({ message: 'Connected!' });
})

app
    //Register
    // .get('/register', User.addUser)

    //Login
    // .get('/login', User.loginUser)
    // .post('/login', User.logoutUser)

    // .get('/user', User.findAll)
    
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

app.listen(3000, () => console.log('Example app listening on port 3000!'))