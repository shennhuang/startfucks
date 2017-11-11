var express = require('express');
var request = require('request');
var apidata = require('../public/data/apidata.json');
function getUbikeNTP(req, res){
    let stationName = req.body.stationName;
    let availabilityUrl = "http://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NewTaipei?&$format=JSON";
    let stationUrl = "http://ptx.transportdata.tw/MOTC/v2/Bike/Station/NewTaipei?&$format=JSON";
    let availabilityOptions = { 
        method: 'GET',
        url : availabilityUrl,
        json: true,
    };
    let stationOptions = { 
        method: 'GET',
        url : stationUrl,
        json: true,
    };

    try {
        request(stationOptions, function (error, response, body) {
            if (error) console.log(error);

            if(!body){
                return res.send('');
            }

            let queryStationID = apidata["ubike(新北)"].list[stationName];
            let stationLoc = {};
            console.log(body);
            for(let v of body){
                if(v.StationID === queryStationID){
                    stationLoc = v.StationPosition;
                    break;
                }
            }

            request(availabilityOptions, function (error, response, body) {
                if (error) console.log(error);

                if(!body){
                    return res.send('');
                }

                let queryStationID = apidata["ubike(新北)"].list[stationName];

                let data;

                for(let v of body){
                    if(v.StationID === queryStationID){
                        data = v;
                        break;
                    }
                }
                return res.send({data, stationLoc});

            });

        });
    } catch (error) {
        console.log(error);
        return res.send('');
    }

}
module.exports = getUbikeNTP;
