var config = require('../config.json');
var express = require('express');
var request = require('request');
function getWeather(req, res){

    let weatherCity = req.body.weatherCity;
    let weatherCountry = req.body.weatherCountry;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + CityList[weatherCity] + ',' + weatherCountry + '&units=metric&mode=json&lang=zh_tw&appid=' + config.weatherApiKey;

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
    "臺北市": "Taipei City",
    "基隆市": "Keelung City",
    "新北市": "New Taipei City",
    "宜蘭縣": "Yilan County",
    "新竹市": "Hsinchu City",
    "新竹縣": "Hsinchu County",
    "桃園市": "Taoyuan City",
    "苗栗縣": "Miaoli County",
    "臺中市": "Taichung City",
    "彰化縣": "Changhua County",
    "南投縣": "Nantou County",
    "雲林縣": "Yunlin County",
    "嘉義市": "Chiayi City",
    "嘉義縣": "Chiayi County",
    "臺南市": "Tainan City",
    "高雄市": "Kaohsiung City",
    "屏東縣": "Pingtung County",
    "臺東縣": "Taitung County",
    "花蓮縣": "Hualien County",
    "連江縣": "Lienchiang County",
    "澎湖縣": "Penghu County",
    "金門縣": "Kinmen County",
    "南海島": "Nanhai",
    "釣魚臺": "Diauyutai"
};