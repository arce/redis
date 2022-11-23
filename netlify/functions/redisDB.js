"use strict";

const Redis = require('ioredis');

const client = new Redis({host:process.env.REDIS_HOST, port:19183,
                         password:process.env.REDIS_PSW});

await client.connect();

module.exports = client;
