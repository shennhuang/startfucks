var express = require('express')
var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');

function getStart(req, res) {
    var loginErr = "";
    var signupErr = "";
    
    res.render('start',{loginErr,signupErr});
}

module.exports ={
    getStart,
} 