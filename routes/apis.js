let express = require('express');
let getWeather = require('../apis/getWeather');
let getUbike = require('../apis/getUbike');
let getUbikeNTP = require('../apis/getUbikeNTP');
let getNews = require('../apis/getNews');
let getcwbWarning = require('../apis/getcwbWarning');
let getcwbAQI = require('../apis/getcwbAQI');

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
    if(req.query.q === 'news'){
        return getNews(req, res);
    }
    if(req.query.q === 'cwbWarning'){
        return getcwbWarning(req, res);
    }
    if(req.query.q === 'AQI'){
        return getcwbAQI(req, res);
    }
}

module.exports = apis;