var express = require('express');
var request = require('request');
var apidata = require('../public/data/apidata.json');
function getUbikeNTP(req, res){
    let stationName = req.body.stationName;
    let url = "http://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NewTaipei?&$format=JSON"
    var options = { 
        method: 'GET',
        url,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        let queryStationID = apidata.ubikeNTP.list[stationName];

        let retVal;

        for(let v of body){
            if(v.StationID === queryStationID){
                retVal = v;
                break;
            }
        }
        return res.send(retVal);

    });

}
module.exports = getUbikeNTP;
