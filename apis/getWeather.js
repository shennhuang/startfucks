var config = require('../config.json');
var express = require('express');
var request = require('request');
function getWeather(req, res){

    let weatherCity = req.body.weatherCity;
    let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + CityList[weatherCity].lat + "&lon=" + CityList[weatherCity].lon + '&units=metric&mode=json&lang=zh_tw&appid=' + config.weatherApiKey;
    
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

var CityList = {
    "臺北市": {
        "lat":25.033612, 
        "lon":121.564731,
    },
    "基隆市": {
        "lat":25.131502, 
        "lon":121.738519,
    },
    "新北市": {
        "lat":25.013196, 
        "lon":121.465023,
    },
    "宜蘭縣": {
        "lat":24.745073,
        "lon":121.782285,
    },
    "新竹市": {
        "lat":24.809504, 
        "lon":120.975704,
    },
    "新竹縣": {
        "lat":24.705552,
        "lon":121.181857,
    },
    "桃園市": {
        "lat":24.988773, 
        "lon":121.313911,
    },
    "苗栗縣": {
        "lat":24.603449, 
        "lon":120.823545,
    },
    "臺中市": {
        "lat":24.136822, 
        "lon":120.687086,
    },
    "彰化縣": {
        "lat":23.958814, 
        "lon":120.569780,
    },
    "南投縣": {
        "lat":23.965170,
        "lon":120.967337,
    },
    "雲林縣": {
        "lat":23.710363, 
        "lon":120.541009,
    },
    "嘉義市": {
        "lat":23.479834, 
        "lon":120.449528,
    },
    "嘉義縣": {
        "lat":23.472966, 
        "lon":120.293183,
    },
    "臺南市": {
        "lat":22.992517,
        "lon":120.204952,
    },
    "高雄市": {
        "lat":22.631297, 
        "lon":120.301972,
    },
    "屏東縣": {
        "lat":22.665466,
        "lon":120.501952,
    },
    "臺東縣": {
        "lat":22.753874,
        "lon":121.145934,
    },
    "花蓮縣": {
        "lat":23.896320,
        "lon":121.540786,
    },
    "連江縣": {
        "lat":26.160665,
        "lon":119.952168,
    },
    "澎湖縣": {
        "lat":23.566390,
        "lon":119.584815,
    },
    "金門縣": {
        "lat":24.447011,
        "lon":118.379849,
    },
    "東沙島": {
        "lat":20.698538, 
        "lon":116.733423,
    },
    "釣魚臺": {
        "lat":25.744989,
        "lon":123.474525,
    },
};