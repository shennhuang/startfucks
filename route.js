var express = require('express');

var router = express.Router();

var home = require('./routes/home');
var start = require('./routes/start');
var apis = require('./routes/apis');

router.get('/', function(req, res) {
    res.redirect('start');
});

router.use('/home', function(req, res) {
    return home(req ,res);
});

router.use('/start', function(req, res) {
    return start(req, res);
});

router.post('/apis' ,function(req, res){
    return apis(req, res);
});


module.exports = router;
