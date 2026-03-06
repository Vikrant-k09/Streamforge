const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'streamforge-api',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka Producer connected');
};

module.exports = {
  producer,
  connectProducer,
};