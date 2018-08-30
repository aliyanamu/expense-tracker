const { User, Expense, Category } = require('../models/')

function list (req, res, errNotif, file) {
    Expense.findAll({
        group:['categoryId'],
        attributes: [
            [sequelize.fn('SUM', sequelize.col('cash')), 'total']
        ],
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
        res.render(file, {exp:expenses, userId: id, errNotif})
       
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = list