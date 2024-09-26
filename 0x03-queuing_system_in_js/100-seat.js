import express from 'express';
import { promisify } from 'util';
import redis from 'redis';
import kue from 'kue';

const app = express();
const port = 1245;

// Redis client setup
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Kue queue setup
const queue = kue.createQueue();

let reservationEnabled = true;

// Redis functions
const reserveSeat = async (number) => {
  await setAsync('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
  const seats = await getAsync('available_seats');
  return parseInt(seats) || 0;
};

// Initialize available seats
(async () => {
  await reserveSeat(50);
})();

// Routes
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }

  const job = queue.create('reserve_seat', {})
    .save((err) => {
      if (err) {
        return res.json({ status: "Reservation failed" });
      }
      res.json({ status: "Reservation in process" });
    });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err}`);
  });
});

app.get('/process', async (req, res) => {
  res.json({ status: "Queue processing" });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    const newSeats = currentSeats - 1;

    if (newSeats >= 0) {
      await reserveSeat(newSeats);
      if (newSeats === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
