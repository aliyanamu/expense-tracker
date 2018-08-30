const express = require('express'),
      router = express.Router(),
      User = require('../controllers/user');

router
    //Register
    // .get('/register', User.addUser)

    //Login
    // .get('/login', User.loginUser)
    // .post('/login', User.logoutUser)

    .get('/', User.findAll)
    
    //Show Profile
    .get('/:id', User.findUser)

    //Edit Profile
    .get('/edit/:id', User.editUser)
    .post('/edit/:id', User.updateUser)

    //Delete Form
    // .get('delete/:id', User.deleteUser)

module.exports = router