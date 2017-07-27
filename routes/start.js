var express = require('express')
var hash = require('../pwdHash/pwdHash.js')
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');

var db = require("./db");

function start(req, res) {

    if(req.method === 'GET'){
        req.session.account = "";
        res.render('start',{loginErr : "",signupErr : "",csrfToken: req.csrfToken()});
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

            var hashpwd = hash.saltHashPassword(req.body.loginPwd);
            db.dbget(getUsers,function(data){
                if(!data.Item || hashpwd != data.Item.pwd){
                    console.log("worng!!!")
                    res.render('start',{loginErr : "account or password is wrong", signupErr : "",csrfToken: req.csrfToken()});
                    return;
                }
                
                req.session.account = req.body.loginAcc;
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

                if(data.Item){
                    return res.render('start',{loginErr : "", signupErr : "account has been used",csrfToken: req.csrfToken()});
                }

                //新增使用者帳號
                var hashpwd = hash.saltHashPassword(users.pwd);// pwd add salt and hash
                var userAcc = {
                    TableName: "startfucks_users",
                    Item : {
                        account:users.account,
                        pwd:hashpwd,
                    }
                }
                db.dbput(userAcc);


                //新使用者預設資料
                let userData = {
                    TableName: "users_data",
                    Item: {
                        account: users.account,
                        name: users.account,
                        settings: {
                            "Time_臺灣":{
                                title: "Time",
                                subtitle: "臺灣",
                                gridItemSize: {width: 1, height: 1},
                                gridItemIndex: 0,
                            }
                        }
                    }
                }
                db.dbput(userData).then(function(){

                    req.session.account = users.account;

                    res.redirect('/home');

                });
            });

        }

    }

}

module.exports = start;