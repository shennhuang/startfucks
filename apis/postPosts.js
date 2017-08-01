var express = require('express');
var db = require('../routes/db.js');

function postPosts(req,res){
    let userData = req.body.userData;
    let title = req.body.title;
    let words = req.body.words;
    console.log({words:words})
    if(!words) words = null;

    let keys = Object.keys(userData.settings);
    for(let key of keys){
        if(key.indexOf('Post(') >= 0 && userData.settings[key].postWords == ""){
            // console.log()
            userData.settings[key].postWords = null;
        } 
    }
    console.log({finall:userData.settings})
    var userDataSave = {
        TableName: "users_data",
        Item : userData
    }
    
    db.dbput(userDataSave).then(function(){
        res.send('postPosts Success.');
    });
}

module.exports = postPosts;