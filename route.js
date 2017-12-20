var express = require('express');

var router = express.Router();

var home = require('./routes/home');
var start = require('./routes/start');
var apis = require('./routes/apis');
var config = require('./config.json');

// force use https if config set useHttps
router.all('*', function(req, res, next) {
    // use X-Forwarded-Proto to check protocol between user and load balancer
    if (!req.secure && (req.get('X-Forwarded-Proto') !== 'https') && config.https.enable && config.https.forceHttps) {
        return res.redirect('https://' + req.hostname + ':' + config.https.port + req.url);
    }
    return next();
});

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
