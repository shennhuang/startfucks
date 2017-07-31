var express = require('express');
var apidata = require('../public/data/apidata.json');
var db = require('./db');

function home(req, res) {

    if(req.method === 'POST'){
        
        var userDataSave = {
            TableName: "users_data",
            Item : req.body.userData
        }

        //console.log({setting : userDataSave.Item.settings})
        db.dbput(userDataSave,function(){
            console.log({put:"put userData"});
        })
        return res.send("Auto Saved!");
    }

    if(!req.session || !req.session.account){
        return res.redirect('/start');
    }

    let account = req.session.account;

    
    let getData = {
        TableName: "users_data",
        Key: {account}
    };

    db.dbget(getData, function(data){
        var apiKeys = Object.keys(apidata);
        return res.render('home', {userData: data.Item, gridRowNum:10, csrfToken: req.csrfToken(),apidata,apiKeys});
    });
         
}

module.exports = home;
