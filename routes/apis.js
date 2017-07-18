function accountcheck(req,res){
    var account = req.body.loginacc;
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

module.exports = {
    accountcheck,
}