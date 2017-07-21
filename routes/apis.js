var express = require('express');
var getWeather = require('../apis/getWeather');
var getUbike = require('../apis/getUbike');

function apis(req, res){
    if(req.query.q === 'weather'){     
        return getWeather(req, res);
    }
    if(req.query.q === 'ubike'){
        return getUbike(req, res);
    }
}

module.exports = apis;