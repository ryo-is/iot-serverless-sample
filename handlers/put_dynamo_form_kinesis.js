"use strict";
const co = require("co");
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
});

module.exports = (event, context, callback) => {
  console.log(`event: ${JSON.stringify(event)}`);

  co(function* () {
    const items = event["Records"];
    console.log(`items: ${JSON.stringify(items)}`);
    const promises = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i]["kinesis"]["data"];
      const payload = new Buffer(item, "base64").toString();
      const data = JSON.parse(payload);
      console.log(`data: ${JSON.stringify(data)}`);
      const param = {
        TableName: "iot-serverless-dynamo",
        Item: data
      };
      const putItemToDB = yield dynamoDB.put(param).promise();
      promises.push(putItemToDB);
    }
    return Promise.all(promises);
  }).then(() => {
    console.log("All done");
    callback(null);
  }).catch((err) => {
    console.error(err);
    callback(err);
  });
};
