var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var router = express.Router();
var route = require('./route');

var csrf = require('csurf');

app.use(session({
    secret : 'key',
    cookie: { maxAge: 12 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
    })
);

//app.use(cors());

app.use('/', csrf({ cookie: false }) , route);

app.listen(8080, function(){
    console.log('server start at localhost:8080 - ' + new Date());
});
