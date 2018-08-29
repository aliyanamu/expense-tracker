const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routeUser = require('./routes/user')
const routeExpense = require('./routes/expense')

app.get('/', (req, res) => {
    // res.render('index')
    res.status(200).json({ message: 'Connected!' });
})

app.use('/user', routeUser);
app.use('/expense', routeExpense);

app.listen(3000, () => console.log('Example app listening on port 3000!'))