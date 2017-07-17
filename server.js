var express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var main = require('./routes/main');

var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

var router = express.Router();


app.use('/main', main);


app.listen(8080, function(){
    console.log('server start at 127.0.0.1:8080');
});
