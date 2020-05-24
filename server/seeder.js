const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
const log = require('./util/logger');
const mongoose = require('mongoose');

// load env vars
dotenv.config();

// Load models
const User = require('./model/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '_data', 'users.json'), 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);

    log.info('Data imported...');
    process.exit();
  } catch (err) {
    log.error(err);
  }
};

// Delete Data
const deleteData = async () => {
  try {
    await User.deleteMany();

    log.info('Data destroyed...');
    process.exit();
  } catch (err) {
    log.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
