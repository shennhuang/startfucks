var config = require("../config.json");
var AWS = require("aws-sdk");
AWS.config.update({region: config.aws.region});

var dynamodb = new AWS.DynamoDB();

var params1 = {
    TableName : config.aws.dynamodb.usersDataTableName,
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

var params2 = {
    TableName : config.aws.dynamodb.usersTableName,
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

dynamodb.createTable(params1, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

dynamodb.createTable(params2, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});