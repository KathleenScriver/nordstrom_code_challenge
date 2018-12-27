var AWS = require('aws-sdk')
var uuid = require('uuid')
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.postTodo = (event, context, callback) => {
    var params = {
        Item: {
            "id": uuid.v1(),
            "todoDescription": event.todoDescription,
            "tag": event.tag,
            "created": event.created
        },
        TableName: process.env.TABLE_NAME
    };

    documentClient.put(params, (err, data) => {
        callback(err,data);
    });
}
