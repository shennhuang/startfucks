var express = require('express');
var getWeather = require('../apis/getWeather');

function apis(req, res){
    if(req.query.q === 'weather'){     
        return getWeather(req, res);
    }
}

module.exports = apis;