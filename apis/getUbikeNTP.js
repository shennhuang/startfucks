var express = require('express');
var request = require('request');
var apidata = require('../public/data/apidata.json');
function getUbikeNTP(req, res){
    let stationName = req.body.stationName;
    let availabilityUrl = "http://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NewTaipei";
    let stationUrl = "http://ptx.transportdata.tw/MOTC/v2/Bike/Station/NewTaipei";
    let availabilityOptions = { 
        method: 'GET',
        url : availabilityUrl,
        qs: { '': '', '$format': 'JSON' },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; rv:11.0) like Gecko',
            'cache-control': 'no-cache'
        },
        json: true,
    };
    let stationOptions = { 
        method: 'GET',
        url : stationUrl,
        qs: { '': '', '$format': 'JSON' },
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; rv:11.0) like Gecko',
            'cache-control': 'no-cache'
        },
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
