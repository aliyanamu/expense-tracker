const { User, Expense, Category } = require('../models/')

class Controller {
    
    /*      User       */
    static findAll(req,res) {
        // res.send('echo user')
        User.findAll({})
        .then(users => {
            res.send(users)
        })
        .catch(e => {
            res.send(e)
        })
    }

    static findUser(req,res) {
        User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            res.render('profile', {user})
        })
        .catch(e => {
            res.send(e)
        })
    }
    
    static editUser (req, res) {
        User.findOne({
          where: {
            id: req.params.id,
            }
          })
        .then(function(row) {
            res.render('editUser',{row})
        })
        .catch(function(e) {
            res.send(e)
        })
    }
    
    static updateuser (req, res) {
        user.update({
          id: req.params.id,
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
          updatedAt: new Date(),
        }, {
          where: {
            id: req.params.id,
          }
        })
    .then(function() {
        res.redirect('/:id/profile')
    })
    .catch(function(e) {
        let message = ''

        for (let i=0; i< e.errors.length; i++) {
            message += `error=${e.errors[i].message}&`
        }
            res.redirect(`/:id/profile/edit?${message}`)
        })
    }

    /*      Expense      */

    static list(req,res, errNotif) {
        // res.send('echo expense')
        Expense.findAll({
            where: {
                userId: req.params.id
            },
            order : [
                ['createdAt','DESC']
            ],
            include : [Category]
        })
        .then(expenses => {
            // res.send(expenses)
            let id = req.params.id
            res.render('expenseList', {exp:expenses, userId: id, errNotif})
           
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addExpense(req, res, errNotif) {
        Category.findAll()
        .then(categories=>{
            // res.send(categories)
            let id = req.params.id
            res.render('addExpense', {userId:id,cat:categories,errNotif})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static putExpense(req, res, errNotif) {
        Expense.create({
            userId: req.params.id,
            categoryId : req.body.categoryId,
            cash : req.body.cash,
            note : req.body.note
        })
        .then(expenses => {
            // res.send(expenses)
            let id = req.params.id
            // res.render('expenseList', {exp:expenses, userId: id, errNotif})
            res.redirect(`/${id}/expense`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller