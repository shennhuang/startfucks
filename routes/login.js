var AWS = require("aws-sdk");

AWS.config.update({region:"us-west-2"});
AWS.config.paramValidation = false;
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var express = require('express');

var db = require("./db");

function loginCheck(req,res){
    var account = req.body.loginAcc;
    var params = {
        TableName: "startfucks",
        Key:{
            "account": account,
        }
    };
    console.log(params)
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            return true;
        }
    });
}

function login(req, res) {
    var getUsers = {
        TableName: "startfucks_users",
        Key:{
            "account": req.body.loginAcc,
        }
    }
    var pwd = req.body.loginPwd;
    console.log({pwd:pwd})
    db.dbget(getUsers,function(data){
        console.log({data : data})
        if(!data.Item || pwd != data.Item.pwd){
            console.log("worng!!!")
            res.render('start',{loginErr : "account or password has wrong", signupErr : ""});
            return;
        }
        return res.redirect('/home');
    })
}

module.exports = login