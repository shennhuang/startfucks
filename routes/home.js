var express = require('express');
var apidata = require('../public/data/apidata.json');
var db = require('./db');

function home(req, res) {

    if(req.method === 'POST'){
        
        var userDataSave = {
            TableName: "users_data;",
            Item : req.body.userData
        }

        console.log({setting : userDataSave.Item.settings})
        db.dbput(userDataSave,function(){
            console.log({put:"put userData"});
        })
        return res.send("Auto Saved!");
    }

    if(!req.session || !req.session.account || !req.session.pwd){
        return res.redirect('/start');
    }

    let account = req.session.account;

    var piggyIsCute = 1; //活著請選1,寫死請選0
    if(piggyIsCute){
        //////////活著真好/////////
        let getData = {
            TableName: "users_data",
            Key: {account}
        };

        db.dbget(getData, function(data){
            var apiKeys = Object.keys(apidata);
            return res.render('home', {userData: data.Item, gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
        });
        //////////活著真好/////////
    }else{
        /////////寫死專區/////////
        var userData = {
            [account]: {
                account : account,
                name: account,
                settings: {
                    "Time_Taiwan":{
                        title: "Time",
                        subtitle: "Taiwan",
                        gridItemSize: {width: 1, height: 1},
                        gridItemIndex: 8,
                    },
                    "Weather_Taipei":{
                        title: "Weather",
                        subtitle: "Taipei",
                        gridItemSize: {width: 2, height: 1},
                        gridItemIndex: 0,
                    },            
                    "Weather_Nantou":{
                        title: "Weather",
                        subtitle: "Nantou",
                        gridItemSize: {width: 2, height: 1},
                        gridItemIndex: 14,
                    },
                    "Ubike_南港公園":{
                        title: "Ubike",
                        subtitle: "南港公園",
                        gridItemSize: {width: 1, height: 1},
                        gridItemIndex: 29,
                    },
                    "Ubike_捷運南港軟體園區站(2號出口)":{
                        title: "Ubike",
                        subtitle: "捷運南港軟體園區站(2號出口)",
                        gridItemSize: {width: 1, height: 1},
                        gridItemIndex: 22,
                    },
                }
            }
        };

        var apiKeys = Object.keys(apidata);
        return res.render('home', {userData: userData[account], gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
    }
}

module.exports = home;
