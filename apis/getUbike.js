var express = require('express');
var request = require('request');
var apidata = require('../public/data/apidata.json');

function getUbike(req, res){
    let stationName = req.body.stationName;
    let url = "http://data.taipei/youbike"
    var options = { 
        method: 'GET',
        url,
        gzip: true,
        json: true,
    };

    let ubikeList = apidata.ubike.list;
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        
        var item = ubikeList[stationName];
        if(body.retVal[item].act == "0"){
            return res.send('');
        }
        return res.send({sbi : body.retVal[item].sbi,bemp : body.retVal[item].bemp});
    });

}
module.exports = getUbike;
