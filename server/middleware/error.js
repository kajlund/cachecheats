// Generic catch-all Error Handler Middleware

const log = require('consola');

const { CustomError } = require('../util/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = 500;
  let message = 'Server Error';

  // Custom Errors can be returned
  if (err instanceof CustomError) {
    status = err.status;
    message = err.message;
  }

  // Faulty Mongoose ObjectId
  if (err.name && err.name === 'CastError') {
    status = 404;
    message = `Resource not found. Faulty id: ${err.value}`;
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    status = 400;
    message = 'Duplicate key value';
  }

  // Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((val) => val.message);
  }

  // Log actual errors
  if (status > 404) {
    log.error(err);
  }

  res.status(status).json({
    success: false,
    error: message,
  });
};
