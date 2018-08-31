const { User, Expense, Category } = require('../models/')

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
        Category.findAll({
            order: [['id', 'ASC']]
        })
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
            Category.findAll({})
            .then(data => {
                res.render('addCategory', {datas:data})
            })
        })
        .catch(e => {
            res.send(e)
        })
    }
    
    static editCategory(req, res) {
        Category.findById(req.params.id)
            .then(data=>{
                // res.send(data)
                res.render('editCategory', {
                    datas: data, id:req.params.id })  
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateCategory(req, res) {
        Category.update(
            req.body, 
            {where: {id:req.params.id}
        })
        .then(data=>{
            res.redirect(`/master/category`)
        })
    }
}

module.exports = Controller