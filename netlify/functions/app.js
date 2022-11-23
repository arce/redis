"use strict"

const client = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    client.on("connect", function() {
      console.log("You are now connected");
    });
    
    const stream = client.scanStream({match: "book_:*"});
    
    let ids =[];
    
    stream.on("data", (resultKeys) => {
     for (let i = 0; i < resultKeys.length; i++)
      ids.push(resultKeys[i]);
    });

    return { statusCode: 200, headers, body: JSON.stringify(ids)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
