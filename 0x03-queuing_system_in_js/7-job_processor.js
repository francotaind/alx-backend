// Import the kue library
const kue = require('kue');

// Create a queue
const queue = kue.createQueue();

// Create a blacklisted array containing the phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Define the sendNotification function
const sendNotification = (phoneNumber, message, job, done) => {
  // Track progress of 0% when the job starts
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track progress to 50%
  job.progress(50, 100);

  // Log sending notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Mark the job as done
  done();
};

// Process jobs in the 'push_notification_code_2' queue, 2 jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Event listeners for global queue error handling
queue.on('error', (err) => {
  console.error('Queue error:', err);
});

