const { User, Expense, Category } = require('../models/')
const listExpensePerUser = require('../helpers/listExpensePerUser')
const {sequelize} = require('../models')

class Controller {
        
    /*      User       */
    static addUser(req, res) {
        
        res.render('registerUser')
    }

    static putUser(req, res) {
        User.findAndCountAll({})
        .then(users => {
            // let NewId = users.dataValues.count+1
            // res.send(users.dataValues.count)
            res.send(users.count);
            
            // User.create({
            //     id: NewId,
            //     userName: req.body.userName,
            //     password: req.body.password,
            //     email: req.body.email
            // })
            // .then(p=>{
            //     res.redirect(`/${NewId}/expense`)
            // })
        })
        .catch(err=>{
            res.send(err)
        })

    }

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
        listExpensePerUser(req, res, errNotif)
    }

    static overview(req,res) {
        Expense.all({
            attributes: [[sequelize.fn('sum', sequelize.col('cash')), 'total']],
            where: {
                userId: req.params.id
            },
            order: [['categoryId','ASC']],
        })
        .then(function(expenses) {
            
            // res.send(expenses)
            res.render('expenseReport', {exp:expenses, userId: id})
        })
        .catch(err => {
            res.send(err)
        })
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
            res.redirect(`/${id}/expense/add?${errMsg}`)
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
                    errNotif:req.query.error})
            }) 
        })
        .catch(err => {
            res.send(err)
        })
    }

    static updateExpense(req, res, errNotif) {
        Expense.update(req.body, {where: {id:req.params.eid}})
        .then(data=>{
            listExpensePerUser(req, res, errNotif, 'expenseList' )
        })
        .catch(err => {
            let errMsg = `error=${err.errors[0].message}`
            res.redirect(`/${id}/expense/edit?${errMsg}`)
        })
    }

    static deleteExpense(req, res, errNotif ) {
        Expense.destroy({where: {id:req.params.eid}})
        .then(data=>{
            listExpensePerUser(req, res, errNotif, 'expenseList')
        })
        .catch(err => {
            res.send(err)
        })
    }
}
// Controller.putUser(req, res)
module.exports = Controller