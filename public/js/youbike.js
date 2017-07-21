var express = require('express');
var request = require('request');
function getUbike(stationName){
    let url = "	http://data.taipei/youbike"
    var options = { 
        method: 'GET',
        url,
        // headers: 
        // { 'content-type': 'application/json'},
        gzip: true,
        json: true,
    };

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
        console.log({item :item})
        var item = ubikeList[stationName];
        console.log(body.retVal[item].sbi)
    });

}