const { User, Expense, Category } = require('../models/')
const formatingDate = require('./dateFormat')
const listMonth = require('./monthForFiltering')


function list (req, res, errNotif, file) {
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
        // res.send(req.body.postedMonth)
        let id = req.params.id
        res.render(file, {
            exp:expenses, 
            postMonth:req.body.createdAt,
            userId: id, 
            errNotif, 
            formatDate:formatingDate,
            month:listMonth
        })
       
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = list
