"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
   const id = parseInt(event.path.split("/").reverse()[0]);
    
   redis.on("connect", function() {
      console.log("You are now connected");
   });

   const book = await redis.get(id);
   let books = [];
   books.push(book);
   books.forEach(toJson);
		
    return { statusCode: 200, headers, body: JSON.stringify(books)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
