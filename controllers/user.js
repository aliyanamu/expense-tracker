const { User, Expense, Category } = require('../models/')

class Controller {
    
    static findAll(req,res) {
        // res.send('echo user')
        User.findAll({})
        .then(users => {
            res.send(users)
        })
            .catch(err=>{
            res.send(err)
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
            .catch(err=>{
            res.send(err)
        })
    }
    
}

module.exports = Controller