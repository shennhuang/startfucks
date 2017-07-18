var express = require('express');
var router = express.Router();

var main = require('./routes/main');
var start = require('./routes/start');
var login = require('./routes/login')
var signup = require('./routes/signup')

router.get('/', function(req, res) {
    res.redirect('start');
});

router.get('/start', function(req, res) {
    start.getstart(req, res);
});

router.post('/login',function(req,res){

    res.render('start',{loginerr : "", signuperr : ""})
})

router.post('/signup',function(req,res){

    postsignup(req,res)
    
})


router.get('/main', function(req, res) {
    main(req ,res)
});

module.exports = router;
