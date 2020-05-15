/* catch-all error middleware */
const log = require('consola');

const { isProduction } = require('../config');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  log.error('ERROR:', err);

  err.statusCode = err.statusCode || 500; /* eslint no-param-reassign: "off" */
  err.status = err.status || 'error';

  if (isProduction) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or other unknown error: don't leak error details
      // Send generic message
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  } else {
    // Send all info in development mode
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
};
