class CustomError extends Error {
  constructor(message = 'Server Error', status = 500) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  CustomError,
};
