var express = require('express');
var request = require('request');
var apidata = require('../public/data/apidata.json')
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
    console.log({ubikeList:ubikeList})
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var data = Object.keys(body.retVal)
        var ubikeList = {};
        
        for(let item of data){
            if(body.retVal[item].act != 0){
                let key = body.retVal[item].sna;
                ubikeList[key] = item;
            }

        }
        
        var item = ubikeList[stationName];
        res.send(body.retVal[item].sbi);
    });

}
module.exports = getUbike;
