var config = require('../config.json');
var apidata = require('../public/data/apidata.json')
var express = require('express');
var request = require('request');
function getNews(req, res){

    let newsSiteId = apidata.news.list[req.body.newsSite];
    let url = "https://newsapi.org/v1/articles?source=" + newsSiteId + "&apiKey=" + config.newsorgApiKey;
    var options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return res.status(200).send(body);
    });

}
module.exports = getNews;
