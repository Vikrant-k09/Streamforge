const { Kafka } = require('kafkajs');
const Event = require('../models/event.model');
const logger = require('../utils/logger');

const kafka = new Kafka({
  clientId: 'streamforge-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'user-event-group' });

const startConsumer = async () => {
  await consumer.connect();
  //console.log('Kafka Consumer connected');
  logger.info('Kafka Consumer connected');


  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const eventData = JSON.parse(message.value.toString());

      //console.log('Received event:', eventData);
      logger.info('Received event', { eventData });

      // Write to Mongo
      await Event.create({
        type: eventData.type,
        userId: eventData.userId,
        payload: {
          name: eventData.name,
          email: eventData.email,
        },
        createdAt: eventData.createdAt,
      });

      //console.log('Event stored in Mongo');
      logger.info('Event stored in Mongo', { eventData });
    },
  });
};

module.exports = startConsumer;