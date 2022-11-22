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

    const pipeline = client.pipeline();
    
    client.get("book_1");
    client.get("book_2");

    const authors = await pipeline.exec()

    return { statusCode: 200, headers, body: JSON.stringify(authors)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};