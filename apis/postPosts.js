var express = require('express');
var db = require('../routes/db.js');

function postPosts(req,res){
    let userData = req.body.userData;
    let title = req.body.title;
    let words = req.body.words;
    
    if(!words) words = null;
    userData.settings[title].postWords = words;
    var userDataSave = {
        TableName: "users_data",
        Item : userData
    }
    
    db.dbput(userDataSave).then(function(){
        res.send('postPosts Success.');
    });
}

module.exports = postPosts;