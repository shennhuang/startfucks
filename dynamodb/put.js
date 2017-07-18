var AWS = require("aws-sdk");
// var credentials = require("~/.aws/credentials.json")
AWS.config.update({region:"us-west-2"});
AWS.config.paramValidation = false;
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var users = {
    account : "test",
    pwd : "password",
    name : "name"
}
putitem(users)
function putitem(users){
    var putdata = {
        TableName: "startfucks",
        Item : {
            "account" : users.account,
            "pwd" : users.pwd,
            "name" : users.name
        }
        
    }

    console.log("Adding a new item...");
        
    docClient.put(putdata, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }   
    })
}
function finduser(useraccount){

}