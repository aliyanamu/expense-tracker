const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      session = require('express-session');

app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routeIndex = require('./routes/index')

app.get('/', (req, res) => {
    res.render('homePage')
    // res.status(200).json({ message: 'Connected!' });
})

app.use('/', routeIndex);

app.listen(3000, () => console.log('Example app listening on port 3000!'))