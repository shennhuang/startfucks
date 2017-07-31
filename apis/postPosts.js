var express = require('express');
var db = require('../routes/db.js');

function postPosts(req,res){
    console.log("postpost")
    console.log({body:req.body})
    let title = req.body.title;
    let words = req.body.words;
    let getData = {
        TableName: "users_data",
        Key: {account : req.session.account}
    };
    db.dbget(getData,function(data){
        // console.log(data.Item.settings[title])
        let postData = data.Item.settings[title]
        postData.postWords = words;
        let userData = {
            TableName: "users_data",
            Item: {
                account: data.Item.account,
                name: data.Item.name,
                settings: data.Item.settings,
            }
        }
        db.dbput(userData,function(){
            res.send("postPost success")
        })
        
        
    })

    
}

module.exports = postPosts;