const { User, Expense, Category } = require('../models/')

class Controller {
    
    static list(req,res) {
        res.send('echo expense')
    }
    
}

module.exports = Controller