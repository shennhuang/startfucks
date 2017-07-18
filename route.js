var express = require('express');
var router = express.Router();

var main = require('./routes/home');
var login = require('./routes/login');

router.get('/', function(req, res) {
    res.redirect('login');
});

router.get('/login', function(req, res) {
    login(req, res);
});

router.get('/home', function(req, res) {
    main(req ,res)
});

module.exports = router;
