var db = require("./db");


function login(req, res) {
    console.log(req)
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
}

module.exports = login