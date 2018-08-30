const { User, Expense, Category } = require('../models/')

class Controller {
    
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
            res.send(user)
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
        res.redirect('/:id')
    })
    .catch(function(e) {
        let message = ''

        for (let i=0; i< e.errors.length; i++) {
            message += `error=${e.errors[i].message}&`
        }
            res.redirect(`/edit/:id?${message}`)
        })
    }
}

module.exports = Controller