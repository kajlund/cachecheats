const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
const log = require('./util/logger');
const mongoose = require('mongoose');

// load env vars
dotenv.config();

// Load models
const User = require('./model/User');
const Municipality = require('./model/Municipality');
const CacheType = require('./model/CacheType');

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

const municipalities = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), '_data', 'municipalities.json'),
    'utf-8'
  )
);

const cachetypes = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '_data', 'cachetypes.json'), 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Municipality.create(municipalities);
    await CacheType.create(cachetypes);

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
    await Municipality.deleteMany();
    await CacheType.deleteMany();

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
