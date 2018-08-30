const { User, Expense, Category } = require('../models/')

class Controller {
    
    static list(req,res, errNotif) {
        // res.send('echo expense')
        Expense.findAll({
            order : [
                ['createdAt','DESC']
            ]
        })
        .then(exp => {
            res.render('addExpense', {exp, errNotif})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
}

module.exports = Controller