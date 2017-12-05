var express = require('express')
var hash = require('../pwdHash/pwdHash.js')
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ejs = require('ejs');
app.set('view engine', 'ejs');

var db = require("./db");
var config = require('../config.json');

function start(req, res) {
    var usersTableName = config.aws.dynamodb.usersTableName;
    var usersDataTableName = config.aws.dynamodb.usersDataTableName;

    if(req.method === 'GET'){
        req.session.account = "";
        res.render('start',{loginErr : "",signupErr : "",csrfToken: req.csrfToken()});
        return;
    }else if(req.method === 'POST'){
        let act = req.body.act;
        if(act == "login"){
            let getUsers = {
                TableName: usersTableName,
                Key:{
                    "account": req.body.loginAcc,
                }
            }

            db.dbget(getUsers,function(data){
                if(!data.Item){
                    console.log("worng!!!")
                    res.render('start',{loginErr : "account or password is wrong", signupErr : "",csrfToken: req.csrfToken()});
                    return;
                }
                let hashpwd = hash.saltHashPassword(req.body.loginPwd);
                if(hashpwd != data.Item.pwd){
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
                TableName: usersTableName,
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
                    TableName: usersTableName,
                    Item : {
                        account:users.account,
                        pwd:hashpwd,
                    }
                }
                db.dbput(userAcc);


                //新使用者預設資料
                let userData = {
                    TableName: usersDataTableName,
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
                        },
                        colors: {
                            headColor:"#3a170f",
                            nameColor:"#f0ffff",
                            fontColor:"#000000",
                            itemColor:"#c6ecf6",
                            backColor:"#f0ffff"
                        }
                    }
                }
                db.dbput(userData).then(function(){

                    req.session.account = users.account;
                    
                    req.session.newhand = true;
                    res.redirect('/home');

                });
            });

        }

    }

}

module.exports = start;