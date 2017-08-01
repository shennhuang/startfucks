var express = require('express');
var db = require('../routes/db.js');

function getposts(req,res){
    let title = req.body.title;
    let getData = {
        TableName: "users_data",
        Key: {account : req.session.account}
    };
    db.dbget(getData,function(data){
        let postWords = data.Item.settings[title].postWords;
        if(!postWords) postWords = "";
        res.send(postWords);
    })

    
}

module.exports = getposts;