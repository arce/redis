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

    //const book_n = await client.get('book_N');
    const book_n = 4;

    //const pipeline = client.pipeline();
    let ids = [];
    for (i=1;i<=book_n;i++)
      ids.push('book_1');
    
    const books = await client.mget(ids);
    // pipeline.get('book_1');
    // pipeline.get('book_2');

    //for (i=1;i<=book_n;i++)
    //  pipeline.get('book_'+i);

    //const books = await pipeline.exec();

    return { statusCode: 200, headers, body: JSON.stringify(books)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
