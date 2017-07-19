var express = require('express');
var app = express();

var ejs = require('ejs');
app.set('view engine', 'ejs');

var db = require("./db");



function signup(req,res){
    var usersTableName = "startfucks_users";
    var users = {
        account : req.body.signupAcc,
        pwd : req.body.signipPwd,
    }

    var getData = {
        TableName: usersTableName,
        Key:{
            account:users.account,
        }
    };  
    db.dbget(getData,function(data){

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

        console.log(req)
        req.session.account = users.account;
        req.session.pwd = users.pwd;
        res.redirect('/home')
    }) 
    
    
}

module.exports = signup