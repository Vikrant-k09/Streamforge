require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/db');
const connectMongo = require('./src/config/mongo');
const { connectProducer } = require('./src/config/kafka');
const { connectRedis }=require('./src/config/redis');

const PORT = process.env.PORT || 3000;

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

const startServer = async () => {
  try {
    // ✅ Test Postgres
    await retry('Postgres', () => pool.query('SELECT 1'));
    console.log('Postgres connected');

    // ✅ Connect Mongo
    await retry('Mongo', connectMongo);

    // ✅ Connect Kafka Producer
    await retry('Kafka producer', connectProducer);

    // ✅ Connect Redis
    await retry('Redis', connectRedis);

    // ✅ Start Express server
    app.listen(PORT, () => {
      console.log(`StreamForge running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

startServer();