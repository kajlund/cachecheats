const log = require('./util/logger');
const mongoose = require('mongoose');

exports.connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  log.info(`MongoDb connected: ${conn.connection.host}`);
};
