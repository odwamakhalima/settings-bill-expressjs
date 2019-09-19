var express = require('express')
var app = express()
var bodyParser = require('body-parser')

const setBill = require('./settingFact')
var moment = require('moment');
moment().format();

const setFact = setBill()
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {

        setting: setFact.getData(),
        totals: setFact.totals(),
        level: setFact.reachWarn()
    })
})

app.post('/settings', function (req, res) {

    setFact.data({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });


    res.redirect('/')

})

app.post('/action', function (req, res) {
    setFact.add(req.body.billItemType)
    res.redirect('/')

})

app.get('/actions', function (req, res) {
    
    var newList = setFact.outPut()
    for(var i =0;i<newList.length;i++){
         var times = newList[i]
    }
    times.myT = moment(times.time).fromNow()

    res.render('action', { actions: newList,})
})

app.get('/actions/:myType', function (req, res) {
    const myType = req.params.myType
    res.render('action', { actions: setFact.filter(myType) })

})

var PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log('the server is running', PORT)
})