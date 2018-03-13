"use strict";
const co = require("co");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
});

module.exports = (event, context, callback) => {
  console.log(`event: ${JSON.stringify(event)}`);

  co(function* () {
    const param = {
      TableName: "iot-serverless-dynamo",
      Item: event
    };
    return yield dynamoDB.put(param).promise();
  }).then(() => {
    console.log("All done");
    callback(null);
  }).catch((err) => {
    console.error(err);
    callback(err);
  });
};
