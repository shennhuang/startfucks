var express = require('express')
var app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');

var db = require("./db");

function start(req, res) {

    if(req.method === 'GET'){
        res.render('start',{loginErr : "",signupErr : ""});
        return;
    }else if(req.method === 'POST'){
        var act = req.body.act;
        console.log({run : act})
        if(act == "login"){
            var getUsers = {
                TableName: "startfucks_users",
                Key:{
                    "account": req.body.loginAcc,
                }
            }

            var pwd = req.body.loginPwd;
            db.dbget(getUsers,function(data){
                if(!data.Item || pwd != data.Item.pwd){
                    console.log("worng!!!")
                    res.render('start',{loginErr : "account or password has wrong", signupErr : ""});
                    return;
                }
                
                req.session.account = req.body.loginAcc;
                req.session.pwd = req.body.loginPwd;
                return res.redirect('/home');
            })
        }else if(act == "signup"){
            console.log({run : "signup"})
            //act == signup
            var users = {
                account : req.body.signupAcc,
                pwd : req.body.signipPwd,
            }

            var getData = {
                TableName: "startfucks_users",
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
                    TableName: "startfucks_users",
                    Item : {
                        account:users.account,
                        pwd:users.pwd,
                    }
                }
                db.dbput(putData)

                req.session.account = users.account;
                req.session.pwd = users.pwd;
                res.redirect('/home')
            })
        }

    }

}

module.exports = start;