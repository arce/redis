"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });
   
   let keys = [];
   let n = await redis.get('book_N');
	  
   for(let i = 1; i<=n; i++)
     keys.push('book_'+i);

   const books = await redis.mget(keys);
		
    return { statusCode: 200, headers, body: books};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
