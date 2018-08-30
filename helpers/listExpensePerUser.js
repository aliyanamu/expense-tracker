const { User, Expense, Category } = require('../models/')

function list (req, res, errNotif) {
    Expense.findAll({
        where: {
            userId: req.params.id
        },
        order : [
            ['createdAt','DESC']
        ],
        include : [Category]
    })
    .then(expenses => {
        // res.send(expenses)
        let id = req.params.id
        res.render('expenseList', {exp:expenses, userId: id, errNotif})
       
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = list