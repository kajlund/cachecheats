const pino = require('pino');

const devMode = process.env.NODE_ENV === 'development';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: devMode,
});

module.exports = logger;
