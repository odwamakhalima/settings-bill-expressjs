var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const setBill = require('./settingFact')

const setFact = setBill()
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index'
    )
})

app.post('/settings', function (req, res) {

    setFact.data({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    console.log(setFact.getData())

    res.redirect('/')

})

app.post('/action', function (req, res) {

})

app.get('/actions', function (req, res) {

})

app.get('/actions/:type', function (req, res) {

})

var PORT = process.env.PORT || 3007

app.listen(PORT, function () {
    console.log('the server is running', PORT)
})