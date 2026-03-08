const { Kafka } = require('kafkajs');

const parseBrokers = () => {
  const raw = process.env.KAFKA_BROKER || process.env.KAFKA_BROKERS || 'localhost:9092';
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};

const kafka = new Kafka({
  clientId: 'streamforge-api',
  brokers: parseBrokers(),
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