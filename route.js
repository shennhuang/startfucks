var express = require('express');
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


router.get('/start', function(req, res) {
    start.getStart(req, res);
});

router.post('/login',function(req,res){

    login(req,res);
})
router.post('/signup',function(req,res){
    signup(req,res);
    
})



module.exports = router;
