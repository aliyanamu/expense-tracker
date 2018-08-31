const { User, Expense, Category } = require('../models/')
const listExpensePerUser = require('../helpers/listExpensePerUser')
const {sequelize} = require('../models')

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
        listExpensePerUser(req, res, errNotif)
    }

    static overview(req,res) {
        Expense.findAll({
            attributes: ['categoryId', [sequelize.fn('sum', sequelize.col('cash')), 'total']],
            where: {
                userId: req.params.id
            },
            order: [['categoryId','ASC']],
            group: ['categoryId']
        })
        .then(function(expenses) {
            let result = [], index = []
            expenses.forEach(xp => {
                result.push(xp.dataValues.total);
                index.push(xp.dataValues.categoryId)
            })  

            let arrRes = []
            let cond = false
            for (let i=1; i <=10; i++) {
                let sum;
                for (let j=0; j <index.length; j++) {
                    if (i === index[j]) {
                        cond = true
                        sum = result[j]
                    }
                }
                if (cond === true) {
                    arrRes.push(sum)
                }
            }

            var data = {
                labels: ["Food & Beverage", "Shopping", "Transportation", "Bills & Utilities", "Entertainment", "Health & Fitness", "Give & Donations", "Investment", "Debt Payment", "Others"],
                datasets: [{
                    label: '# of Votes',
                    data: arrRes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(230, 200, 90, 0.2)',
                        'rgba(80, 172, 172, 0.2)',
                        'rgba(133, 142, 235, 0.2)',
                        'rgba(225, 199, 94, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(230, 200, 90, 1)',
                        'rgba(80, 172, 172, 1)',
                        'rgba(133, 142, 235, 1)',
                        'rgba(225, 199, 94, 1)'
                    ],
                    borderWidth: 1
                }]
            }
            // console.log(expenses[0])
            // res.send(expenses[0]['total'])
            
            // let arrSum = []
            // expenses.forEach (e => {
            //     arrSum.push(e.total)
            // })
            // res.send(arrSum)
            res.render('expenseReport', {exp:data})
        })
        .catch(err => {
            console.log(err)
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

module.exports = Controller