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

var https = require('https');
var ssl = require('./ssl/ssl.js');

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

var host = config.host || 'localhost';
var port = config.port || 8080;
var httpsPort = config.https.port || 8443;
var httpsEnable = config.https.enable || false;
app.listen(port, function(){
    console.log('server(http ) start at ' + host + ':' + port + ' - ' + new Date());
});

if (httpsEnable) {
    https.createServer(ssl.options, app).listen(httpsPort, function() {
        console.log('server(https) start at ' + host + ':' + httpsPort + ' - ' + new Date());
    });
}
