const express = require('express'),
      router = express.Router(),
      UserCtrl = require('../controllers/user');

router
    //Register
    // .get('/register', UserCtrl.addUser)

    //Login
    // .get('/login', UserCtrl.loginUser)
    // .post('/login', UserCtrl.logoutUser)

    //Show Profile
    .get('/', UserCtrl.findUser)

    //Edit Expense
    // .get('/edit/:id', UserCtrl.editUser)
    // .post('/edit/:id', UserCtrl.updateUser)

    //Delete Form
    // .get('delete/:id', UserCtrl.deleteUser)

module.exports = router