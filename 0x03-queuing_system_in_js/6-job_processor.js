// Import the kue library
const kue = require('kue');

// Create a queue
const queue = kue.createQueue();

// Function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs in the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Extract job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function
  sendNotification(phoneNumber, message);

  // Signal that the job is done
  done();
});

