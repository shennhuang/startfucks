var express = require('express')
var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');

function getstart(req, res) {
    var loginerr = "";
    var signuperr = "";
    
    res.render('start',{loginerr,signuperr});
}

module.exports ={
    getstart,
} 