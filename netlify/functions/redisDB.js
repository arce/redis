"use strict";

const Redis = require('ioredis');

const client = new Redis({host:process.env.REDIS_HOST, port:10169,
                         password:process.env.REDIS_PSW});

module.exports = client;
