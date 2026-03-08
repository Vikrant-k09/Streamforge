require('dotenv').config();

const connectMongo = require('./src/config/mongo');
const startConsumer = require('./src/config/kafka.consumer');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async (label, fn, { retries = 30, delayMs = 1000 } = {}) => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const msg = err && err.message ? err.message : String(err);
      console.warn(`${label} failed (attempt ${attempt}/${retries}): ${msg}`);
      if (attempt < retries) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
};

const start = async () => {
  try {
    await retry('Mongo', connectMongo);
    await retry('Kafka consumer', startConsumer);
  } catch (err) {
    console.error('Consumer startup error:', err);
    process.exit(1);
  }
};

start();