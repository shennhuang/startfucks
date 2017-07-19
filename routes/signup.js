var AWS = require("aws-sdk");

AWS.config.update({region:"us-west-2"});
AWS.config.paramValidation = false;
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var express = require('express');
var app = express();

var ejs = require('ejs');
app.set('view engine', 'ejs');

var db = require("./db");

function signup(req,res){
    var usersTableName = "startfucks_users";
    var users = {
        account : req.body.signupAcc,
        pwd : req.body.pwd,
    }

    var getData = {
        TableName: usersTableName,
        Key:{
            account:users.account,
        }
    };  
    db.dbget(getData,function(data){

        console.log({data : data})
        if(!!data.Item){
            res.render('start',{loginErr : "", signupErr : "account has been used"})
            return;
        }
        var putData = {
            TableName: usersTableName,
            Item : {
                account:users.account,
                pwd:users.pwd,
            }
        }
        db.dbput(putData)

        res.redirect('/home')
    }) 
    
    
}

module.exports = signup