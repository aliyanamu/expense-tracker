const { User, Expense, Category } = require('../models/')

class Controller {
    
    static findUser(req,res) {
        // res.send('echo user')
        User.findAll({})
        .then(students => {
            // res.send(teachers)
            res.send(students)
        })
            .catch(err=>{
            res.send(err)
        })
    }
    
}

module.exports = Controller