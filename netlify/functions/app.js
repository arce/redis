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
    
    const stream = await client.scanStream({match: "book_*"});
    
    let books = [];
    
    stream.on("data", (resultKeys) => {
      books = client.mget(resultKeys);
    });
    
    return { statusCode: 200, headers, body: JSON.stringify(books)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
