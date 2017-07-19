var AWS = require("aws-sdk");
AWS.config.update({region:"us-west-2"});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "startfucks_users",
    KeySchema: [       
        { AttributeName: "account", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "account", AttributeType: "S" },
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 3, 
        WriteCapacityUnits: 3
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});