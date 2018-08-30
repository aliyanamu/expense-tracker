const { User, Expense, Category } = require('../models/')
const listExpensePerUser = require('../helpers/listExpensePerUser')

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
        .then(function(user) {
            res.render('editUser',{user, err: req.query.error})
        })
        .catch(function(e) {
            res.send(e)
        })
    }
    
    static updateUser (req, res) {
        User.update({
          id: req.params.id,
          userName: req.body.userName,
          email: req.body.email,
          updatedAt: new Date(),
        }, {
          where: {
            id: req.params.id,
          }
        })
    .then(function() {
        let id = req.params.id
        res.redirect(`/${id}/profile`)
    })
    .catch(function(e) {
        let id = req.params.id
        let message = ''

        for (let i=0; i< e.errors.length; i++) {
            message += `error=${e.errors[i].message}&`
        }
            res.redirect(`/${id}/profile/edit?${message}`)
        })
    }

    /*      Expense      */

    static list(req,res, errNotif) {
        // res.send('echo expense')
        listExpensePerUser(req, res, errNotif)
    }

    static addExpense(req, res) {
        Category.findAll()
        .then(categories=>{
            // res.send(categories)
            let id = req.params.id
            res.render('addExpense', {userId:id,cat:categories,errNotif:req.query.error})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static putExpense(req, res, errNotif) {
        let id = req.params.id
        Expense.create({
            userId: req.params.id,
            categoryId : req.body.categoryId,
            cash : req.body.cash,
            note : req.body.note
        })
        .then(expenses => {
            // res.send(expenses)
            res.redirect(`/${id}/expense`)
        })
        .catch(err => {
            let errMsg = `error=${err.errors[0].message}`
            res.redirect(`/${id}/expense/edit?${errMsg}`)
        })
    }
    
    static editExpense(req,res, errNotif) {
        Expense.findAll({where: {id:req.params.eid},
        include : [Category]
        })
        .then(data=>{
            // res.send(data)
            Category.findAll()
            .then(categories=>{
                let id = req.params.id
                let eid = req.params.eid
                // res.send(data)
                res.render('editExpense', {
                    userId:id,
                    expId:eid,
                    cat:categories,
                    datas: data[0],
                    errNotif})
            }) 
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateExpense(req, res, errNotif) {
        Expense.update(req.body, {where: {id:req.params.eid}})
        .then(data=>{
            listExpensePerUser(req, res, errNotif)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteExpense(req, res, errNotif) {
        Expense.destroy({where: {id:req.params.eid}})
        .then(data=>{
            listExpensePerUser(req, res, errNotif)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller