var express = require('express');
var getWeather = require('../apis/getWeather');
var getUbike = require('../apis/getUbike');
var getUbikeNTP = require('../apis/getUbikeNTP');

function apis(req, res){

    if(req.query.q === 'weather'){     
        return getWeather(req, res);
    }
    if(req.query.q === 'ubike'){
        return getUbike(req, res);
    }
    if(req.query.q === 'ubikeNTP'){
        return getUbikeNTP(req, res);
    }
}

module.exports = apis;