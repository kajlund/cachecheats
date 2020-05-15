const path = require('path');

const dotenv = require('dotenv');

const pack = require('../package.json');

const cnf = {};

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env') });

cnf.env = process.env.NODE_ENV || 'development';
cnf.isProduction = Boolean(cnf.env === 'production');
cnf.port = parseInt(process.env.PORT, 10) || 3000;
cnf.client = {
  description: pack.description,
  name: 'CacheCheats',
  version: pack.version,
};

module.exports = cnf;
