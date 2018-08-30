const { User, Expense, Category } = require('../models/')
const listExpensePerUser = require('../helpers/listExpensePerUser')

class Controller {
        
    /*      Admin      */
    static findAll(req,res) {
        // res.send('echo user')
        User.findAll({})
        .then(users => {
            res.render('userList', {user:users})
        })
        .catch(e => {
            res.send(e)
        })
    }
    
    static listCategory(req, res) {
        Category.findAll({})
        .then(data => {
            res.render('addCategory', {datas:data})
        })
        .catch(e => {
            res.send(e)
        })
    }
    

    static putCategory(req, res) {
        Category.create({
            categoryName: req.body.categoryName
        })
        .then(data=>{
            res.redirect('/master/category')
        })
    }
    
    static editCategory(req, res) {
        
    }

    static updateCategory(req, res) {

    }
}

module.exports = Controller