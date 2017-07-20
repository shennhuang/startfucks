var express = require('express');
var app = express();

var router = express.Router();

var home = require('./routes/home');
var start = require('./routes/start');

var apis = require('./routes/apis');

router.get('/', function(req, res) {
    res.redirect('start');
});

router.get('/home', function(req, res) {
    home(req ,res);
});

router.use('/start', function(req, res) {
    start(req, res);
});

router.post('/apis', function(req, res){
    apis(req, res);
});

module.exports = router;
