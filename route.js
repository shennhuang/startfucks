var express = require('express');
var app = express();

var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: false });
app.use(csrf());

var home = require('./routes/home');
var start = require('./routes/start');
var apis = require('./routes/apis');

router.get('/', function(req, res) {
    res.redirect('start');
});

router.get('/home', csrfProtection, function(req, res) {
    return home(req ,res);
});

router.use('/start', csrfProtection, function(req, res) {
    return start(req, res);
});

//csrf issue
router.post('/apis' ,function(req, res){
    if(req.session.csrfSecret && req.session.csrfSecret === req.body._csrf){
        return apis(req, res);
    }
    return res.status(403).send('Forbidden(invalid csrf token)');

});


module.exports = router;
