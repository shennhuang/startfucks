var express = require('express');
var app = express();
var session = require('express-session');
var cors = require('cors');
var compression = require('compression');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit:'50mb'}));

var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var router = express.Router();
var route = require('./route');

var csrf = require('csurf');

var config = require('./config.json')

app.use(session({
    secret : 'key',
    cookie: { maxAge: 12 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
    })
);
app.use(compression());
//app.use(cors());

app.use('/', csrf({ cookie: false }) , route);

app.listen(config.port, function(){
    console.log('server start at  ' + config.host + ':' + config.port + ' - ' + new Date());
});
