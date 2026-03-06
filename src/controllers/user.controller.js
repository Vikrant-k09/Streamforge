const pool = require('../config/db');
const Event = require('../models/event.model');
const { producer } = require('../config/kafka');
const { redisClient } = require('../config/redis');
const logger = require('../utils/logger');

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

  //   await Event.create({
  // type: 'USER_CREATED',
  // userId: result.rows[0].id,
  // payload: {
  //   name: result.rows[0].name,
  //   email: result.rows[0].email
  // }
  await producer.send({
  topic: 'user-events',
  messages: [
    {
      value: JSON.stringify({
        type: 'USER_CREATED',
        userId: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        createdAt: new Date().toISOString(),
      }),
    },
  ],
});

//invalidating the cache
await redisClient.del('users:all');

    res.status(201).json(result.rows[0]);
  } catch (error) {
    //console.error(error);
    logger.error("User creation failed", { error });

    if (error.code === '23505') {
      logger.error("User creation failed: Email already exists", { error });
      return res.status(409).json({ message: 'Email already exists' });

    }

    logger.error("User creation failed: Internal server error", { error });
    res.status(500).json({ message: 'Internal server error' });

  }

  //event log 
  
};

//get the data 
const getUsers = async (req, res) => {
  // try {
  //   const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
  //   res.status(200).json(result.rows);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: 'Internal server error' });
  // }
  try {
    const cacheKey = 'users:all';

    // 1️⃣ Check Redis first
    const cachedUsers = await redisClient.get(cacheKey);

    if (cachedUsers) {
      //console.log('Serving users from Redis cache');
      logger.info('Serving users from Redis cache');
      return res.status(200).json(JSON.parse(cachedUsers));
    }

    // 2️⃣ If cache miss → query Postgres
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');

    const users = result.rows;

    // 3️⃣ Store in Redis
    await redisClient.set(cacheKey, JSON.stringify(users), {
      EX: 60, // expire after 60 seconds
    });
    //console.log('Users cached in Redis');
    logger.info('Users cached in Redis');

    res.status(200).json(users);

  } catch (error) {
    //console.error(error);
    logger.error("Failed to get users", { error });
    res.status(500).json({ message: 'Internal server error' });
  }

};

module.exports = { createUser, getUsers };
