require('dotenv').config();

const app = require('./src/app');
const pool = require('./src/config/db');
const connectMongo = require('./src/config/mongo');
const { connectProducer } = require('./src/config/kafka');
const { connectRedis }=require('./src/config/redis');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // ✅ Test Postgres
    await pool.query('SELECT 1');
    console.log('Postgres connected');

    // ✅ Connect Mongo
    await connectMongo();

    // ✅ Connect Kafka Producer
    await connectProducer();

    // ✅ Connect Redis
    await connectRedis();

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