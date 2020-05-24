const expressPino = require('express-pino-logger');

const logger = require('../util/logger');

const expressLogger = expressPino({ logger });

module.exports = expressLogger;
