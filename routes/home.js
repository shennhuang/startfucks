var express = require('express');
var apidata = require('../public/data/apidata.json');
var sheetList = require('../public/data/sheetList.json');
var db = require('./db');
var config = require('../config.json');

function home(req, res) {
    var usersDataTableName = config.aws.dynamodb.usersDataTableName;

    if(req.method === 'POST'){
        let userData = req.body.userData;
        if(userData.settings){
            let keys = Object.keys(userData.settings);
            for(let key of keys){
                if(key.indexOf('Post(') >= 0 && userData.settings[key].postWords == ""){
                    userData.settings[key].postWords = null;
                } 
            }
        }

        var userDataSave = {
            TableName: usersDataTableName,
            Item : userData
        }
        db.dbput(userDataSave).then(function(){
            console.log({put:"put userData"});
        });
            
        return res.send("Auto Saved!");
    }

    if(!req.session || !req.session.account){
        return res.redirect('/start');
    }

    let account = req.session.account;

    
    let getData = {
        TableName: usersDataTableName,
        Key: {account}
    };

    db.dbget(getData, function(data){
        apiKeys = Object.keys(apidata);
        sheetList = JSON.parse(JSON.stringify(sheetList));
        res.render('home', {userData: data.Item, gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys,sheetList,newhand:req.session.newhand});
        req.session.newhand = undefined;
        return;
    });
         
}

module.exports = home;
