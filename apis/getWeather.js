var config = require('../config.json');
var express = require('express');
var request = require('request');
function getWeather(req, res){

    let weatherCity = req.body.weatherCity;
    let weatherCountry = req.body.weatherCountry;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + weatherCity + ',' + weatherCountry + '&units=metric&mode=json&lang=zh_tw&appid=' + config.weatherApiKey;

    var options = { 
        method: 'GET',
        url,
        headers: 
        {
            'content-type': 'application/json' 
        },
        json: true
    };

    return request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return res.status(200).send(body);
    });
}
module.exports = getWeather;