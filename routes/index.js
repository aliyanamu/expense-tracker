const express = require('express'),
      router = express.Router(),
      app = express(),
      Ctrl = require('../controllers/ctrl'),
      CtrlAdmin = require('../controllers/admin');


      function getSession(req, res, next) {
          if (req.session.username) {
              next()
          } else {
              res.redirect('/login');
          }
      }
    //   function getSession(req, res, next) {
    //       if (req.session.username) {
    //           next()
    //       } else {
    //           res.redirect('/login');
    //       }
    //   }

router

    //Register
    .get('/register', Ctrl.addUser)
    .post('/register/success', Ctrl.putUser)

    
    

    //Login
    // .get('/login', Ctrl.loginUser)
    // .post('/login', Ctrl.logoutUser)


    // app.use('/:id/expense', getSession)
<<<<<<< HEAD
    app.use('/:id/user', getSession)
    app.use('/master', getSession)
=======
    // app.use('/:id/user', getSession)
    // app.use('/master', getSession)
>>>>>>> c4156f95862117d99dd6a3d5d0b1caef234c5df7
    
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
    .get('/:id/expense/overview', Ctrl.overview)
    
    //Show Profile - profile
    .get('/:id/profile', Ctrl.findUser)
    
    //Edit Profile - editUser
    .get('/:id/profile/edit', Ctrl.editUser)

    // .post('/:id/profile/edit', Ctrl.updateUser)

//////////////////Master Access////////////////////

    //Show list User - for admin only
    .get('/master/user', CtrlAdmin.findAll)

    //Show list category - for admin only
    .get('/master/category', CtrlAdmin.listCategory)
    .post('/master/category', CtrlAdmin.putCategory)

    // //Edit category - for admin only
    .get('/master/category/edit/:id', CtrlAdmin.editCategory)
    .post('/master/category/edit/:id', CtrlAdmin.updateCategory)

module.exports = router