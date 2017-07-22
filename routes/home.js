var express = require('express');
var apidata = require('../public/data/apidata.json')
var db = require('./db');
var csrfToken = 0;

function home(req, res) {
    if(!req.session || !req.session.account || !req.session.pwd){
        return res.redirect('/start');
    }

    let account = req.session.account;

    let getData = {
        TableName: "users_data",
        Key:{
            account
        }
    };

    db.dbget(getData, function(data){
        //console.log(data)
    });


    var result = {

    [account]: {
            name: account,
            settings: [
            {
                title: "Time",
                subtitle: "Taiwan",
                gridItemSize: {width: 1, height: 1},
                gridItemLocation: {col: 1, row: 1},
            },
            {
                title: "Weather",
                subtitle: "New Taipei City",
                gridItemSize: {width: 2, height: 1},
                gridItemLocation: {col: 2, row: 3},
            },
            {
                title: "Ubike",
                subtitle: "南港公園",
                gridItemSize: {width: 1, height: 1},
                gridItemLocation: {col: 5, row: 5},
            },]
        }

    };

    let csrfToken = req.csrfToken();
    req.session.csrfSecret = csrfToken;

    var apiKeys = Object.keys(apidata);
    return res.render('home', {result: result[account], gridRowNum:10, csrfToken: csrfToken,apidata,apiKeys});
}

module.exports = home;
