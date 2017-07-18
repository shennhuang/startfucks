var AWS = require("aws-sdk");

AWS.config.update({region:"us-west-2"});
AWS.config.paramValidation = false;
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var apis = ("./apis");

function postsignup(req,res){
    var users = {
        account : req.body.signupacc,
        pwd : req.body.pwd
    }

    var acccheck = signup.accountcheck(req,res) //check account repeat
    if(acccheck){res.render('start',{loginerr:"account has been used",signuperr : ""})}

    res.render('start',{loginerr : "", signuperr : ""})
}

module.exports = {
    postsignup,
}