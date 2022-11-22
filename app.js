const Redis = require('ioredis');
const fs = require('fs');

const client = new Redis({
    host: 'redis-19183.c82.us-east-1-2.ec2.cloud.redislabs.com',
    port: 19183,
    password: 'ZfVkRT9gR9c8CkPduRE7If8BdTxy7cUt'
});

client.on("connect", function() {
  console.log("You are now connected");
});

client.set("student", "Laylaa");

client.set("student", "Laylaa", function(err, reply) {
  console.log(reply);
});

client.get('student', function(err, reply) {
    console.log(reply);
});

client.hmset("employees", { HR: "Anthony", MIS: " Clint", Accounting: "Mark" });

client.hgetall("employees", function(err, object) {
  console.log(object);
});

client.rpush(["vegetable", "carrot", "celery"], function(err, reply) {
  console.log(reply);
});

client.lrange("vegetable", 0, -1, function(err, reply) {
  console.log(reply);
});