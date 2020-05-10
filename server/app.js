const path = require('path');

const compression = require('compression');
const log = require('consola');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');

const cnf = require('./config');

log.info('Creating app and setting port');
const app = express();
app.set('port', cnf.port);

/* MIDDLEWARE */
log.info('Adding middleware...');

// Use gzip compression if serving without proxy
log.info('Adding gzip compression middleware');
app.use(compression());

// Handle json and form input
log.info('Adding form and json input handling middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set security headers
log.info('Set Helmet security headers');
app.use(helmet());

// Prevent XSS attacks
log.info('Prevent XSS attacks');
app.use(xss());

// Prevent http param pollution
log.info('Prevent param pollution');
app.use(hpp());

// Enable CORS
log.info('Enable CORS');
app.use(cors());

// Serve static files
log.info('Serve public folder');
app.use(express.static(path.join(process.cwd(), 'public'), { maxAge: 31557600000 }));

log.info('Registering routes');
app.use('/api/v1/about', require('./routes/api/v1/about'));

module.exports = app;
