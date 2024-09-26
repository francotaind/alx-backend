// Import the redis library
const redis = require('redis');

// Create a Redis client for the subscriber
const subscriber = redis.createClient();

// Handle connection to the Redis server
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Handle errors
subscriber.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err}`);
});

// Subscribe to the channel 'holberton school channel'
subscriber.subscribe('holberton school channel');

// Handle receiving messages
subscriber.on('message', (channel, message) => {
  console.log(message);

  // Unsubscribe and quit if the message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
