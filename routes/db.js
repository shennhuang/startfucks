var AWS = require("aws-sdk");
AWS.config.update({region:"us-west-2"});
AWS.config.paramValidation = false;
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function dbput(putData){
    // console.log(putData)
    console.log("Adding a new item...");
    docClient.put(putData, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }   
    })
}

function dbget(getData,fn){
    
    docClient.get(getData , function(err, data) { 
        fn(data)
    });
}
module.exports = {
    dbput,
    dbget,
}