let express = require('express');
let request = require('request');
let apidata = require('../public/data/apidata.json');

function getcwbAQI(req, res){

    let stationName = req.body.areaAndStationName.split("_")[1];
    let url = "https://taqm.epa.gov.tw/taqm/aqs.ashx?lang=tw&act=aqi-epa"
    let options = { 
        method: 'GET',
        url,
        gzip: true,
        json: true,
    };

    request(options, function (error, response, body) {
        if (error) console.log(error);
    
        if(body.Result === "ok") {
            let data = body.Data;
            for(i = 0 ; i < data.length ; i++){
                if(data[i].SiteName === stationName){
                    return res.send({data:data[i]});
                }
            }
        }
    });

}
module.exports = getcwbAQI;