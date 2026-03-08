const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'streamforge-api' },
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;