var express = require('express');
var db = require('../routes/db.js');

function postPosts(req,res){
    console.log("postpost")
    console.log({body:req.body})
    let title = req.body.title;
    let getData = {
        TableName: "users_data",
        Key: {account : req.session.account}
    };
    db.dbget(getData,function(data){
        // console.log(data.Item.settings[title])
        let postData = data.Item.settings[title]
        postData[postWords] = words;

        res.send("postGet success")
    })

    
}

module.exports = postPosts;