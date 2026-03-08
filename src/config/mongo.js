const mongoose = require('mongoose');

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
};

module.exports = connectMongo;