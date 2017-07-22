var express = require('express');
var apidata = require('../public/data/apidata.json')
var db = require('./db');

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


    var userData = {

    [account]: {
            name: account,
            settings: [
            {
                title: "Time",
                subtitle: "Taiwan",
                gridItemSize: {width: 1, height: 1},
                gridItemIndex: 8,
            },
            {
                title: "Weather",
                subtitle: "Taipei",
                gridItemSize: {width: 2, height: 1},
                gridItemIndex: 0,
            },            
            {
                title: "Weather",
                subtitle: "Nantou",
                gridItemSize: {width: 2, height: 1},
                gridItemIndex: 14,
            },
            {
                title: "Ubike",
                subtitle: "南港公園",
                gridItemSize: {width: 1, height: 1},
                gridItemIndex: 29,
            },
            {
                title: "Ubike",
                subtitle: "捷運南港軟體園區站(2號出口)",
                gridItemSize: {width: 1, height: 1},
                gridItemIndex: 22,
            },
            ]
        }

    };

    var apiKeys = Object.keys(apidata);
    return res.render('home', {userData: userData[account], gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
}

module.exports = home;
