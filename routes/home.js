var express = require('express');
var apidata = require('../public/data/apidata.json');
var db = require('./db');
var csrfToken = 0;

function home(req, res) {
    if(!req.session || !req.session.account || !req.session.pwd){
        return res.redirect('/start');
    }
    
    let csrfToken = req.csrfToken();
    req.session.csrfSecret = csrfToken;

    let account = req.session.account;
    //////////活著真好/////////
    // let getData = {
    //     TableName: "users_data",
    //     Key:{account}
    // };

    // db.dbget(getData, function(data){
    //     console.log({homegetdata : data.Item});
    //     var apiKeys = Object.keys(apidata);
    //     return res.render('home', {userData: data.Item, gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
    // });
    //////////活著真好/////////

    /////////寫死專區/////////
    var userData = {

    [account]: {
            name: account,
            settings: [
            {
                title: "Time",
                subtitle: "Taiwan",
                gridItemSize: {width: 1, height: 1},
                gridItemIndex: 3,
            },
            {
                title: "Weather",
                subtitle: "Taipei",
                gridItemSize: {width: 2, height: 1},
                gridItemIndex: 7,
            },
            {
                title: "Ubike",
                subtitle: "南港公園",
                gridItemSize: {width: 1, height: 1},
                gridItemIndex: 20,
            },
            ]
        }

    };

    var apiKeys = Object.keys(apidata);
    return res.render('home', {userData: userData[account], gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
    /////////寫死專區/////////
}

module.exports = home;
