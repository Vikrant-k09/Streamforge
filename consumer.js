require('dotenv').config();

const connectMongo = require('./src/config/mongo');
const startConsumer = require('./src/config/kafka.consumer');

const start = async () => {
  try {
    await connectMongo();
    await startConsumer();
  } catch (err) {
    console.error('Consumer startup error:', err);
    process.exit(1);
  }
};

start();