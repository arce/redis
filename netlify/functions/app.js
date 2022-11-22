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

    //const book_n = await client.get("book_N");

    // const pipeline = client.pipeline();
   
    const books = client.mget(["book_1","book_2"]);
    // client.get("book_2");

    //for (i=1;i<Number(book_n);i++)
    //  client.get("book_"+String(i));

    // const authors = await pipeline.exec();

    return { statusCode: 200, headers, body: JSON.stringify(books)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
