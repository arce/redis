"use strict"

const redis = require('./redisDB');
const headers = require('./headersCORS');

function toJson(item, index, arr) {
  arr[index] = JSON.parse(item);
}

const books = [
  {
    "id": 1,
    "title": "Operating System Concepts",
    "edition": "9th",
    "copyright": 2012,
    "language": "ENGLISH",
    "pages": 976,
    "author": "Abraham Silberschatz",
    "publisher": "John Wiley & Sons"
  },
  {
    "id": 2,
    "title": "Database System Concepts",
    "edition": "6th",
    "copyright": 2010,
    "language": "ENGLISH",
    "pages": 1376,
    "author": "Abraham Silberschatz",
    "publisher": "John Wiley & Sons"
  },
  {
    "id": 3,
    "title": "Computer Networks",
    "edition": "5th",
    "copyright": 2010,
    "language": "ENGLISH",
    "pages": 960,
    "author": "Andrew S. Tanenbaum",
    "publisher": "Pearson Education"
  },
  {
    "id": 4,
    "title": "Modern Operating Systems",
    "edition": "4th",
    "copyright": 2014,
    "language": "ENGLISH",
    "pages": 1136,
    "author": "Andrew S. Tanenbaum",
    "publisher": "Pearson Education"
  }
];

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    
    redis.on("connect", function() {
      console.log("You are now connected");
    });

	 const n = books.length;
		
   for(let i = 1; i<=n; i++)
     await redis.put('book_'+i,JSON.stringify(books[i-1]));
	 
   await redis.put('book_N',n);
    
   return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
