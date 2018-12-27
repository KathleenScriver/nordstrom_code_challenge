var AWS = require('aws-sdk')
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.getTodos = (event, context, callback) => {
    if (event.searchValue === 'all') {
        var params = {
            TableName: process.env.TABLE_NAME
        }

        documentClient.scan(params, (err, data) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, data.Items);
            }
        });
    } else {
        var params = {
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: "tag = :a",
            ExpressionAttributeValues: {
                ":a": event.searchValue
            }
        }
        documentClient.query(params, (err, data) => {
            if(err) {
                callback(err, null);
            } else {
                callback(null, data.Items);
            }
        });
    }
}
