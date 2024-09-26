//import redis library
const redis = require('redis');
//create a new redis client
const client = redis.createClient();
//handle connection to the redis server

client.on('connect', () => {
	console.log('Redis client connected to the server');
});
//Handle connection errors
client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err}`);
});
// Define the hash key
const hashKey = 'HolbertonSchools';

// Use HSET to store values in the hash
client.hset(hashKey, 'Portland', 50, redis.print);
client.hset(hashKey, 'Seattle', 80, redis.print);
client.hset(hashKey, 'New York', 20, redis.print);
client.hset(hashKey, 'Bogota', 20, redis.print);
client.hset(hashKey, 'Cali', 40, redis.print);
client.hset(hashKey, 'Paris', 2, redis.print);

// Use HGETALL to retrieve and display the entire hash
client.hgetall(hashKey, (err, result) => {
  if (err) {
    console.error(`Error retrieving hash: ${err}`);
  } else {
    console.log(result);
  }

  // Close the Redis connection when done
  client.quit();
});
