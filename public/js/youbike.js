var express = require('express');
var request = require('request');
function getUbike(req, res){
    let url = "	http://data.taipei/youbike"
    var options = { 
        method: 'GET',
        url,
        headers: 
        { 
            'content-type': 'application/json' 
        },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });

}
module.exports = getUbike;