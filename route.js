var express = require('express');
var app = express();


var router = express.Router();

var home = require('./routes/home');
var start = require('./routes/start');
var login = require('./routes/login')
var signup = require('./routes/signup')

router.get('/', function(req, res) {
    res.redirect('start');
});

router.get('/home', function(req, res) {
    home(req ,res);
});


router.use('/start', function(req, res) {
    start(req, res);
});


module.exports = router;
