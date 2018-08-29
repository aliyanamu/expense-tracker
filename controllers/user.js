const { User, Expense, Category } = require('../models/')

class Controller {
    
    static findUser(req,res) {
        res.send('echo user')
    }
    
}

module.exports = Controller