var config = require('../config.json');
var express = require('express');
var request = require('request');
function getWeather(req, res){
    let city = req.body.city;
    let country = req.body.country;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&units=metric&mode=json&lang=zh_tw&appid=' + config.weatherApiKey;

    var options = { 
        method: 'GET',
        url,
        headers: 
        {
            'content-type': 'application/json' 
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });

}
module.exports = getWeather;