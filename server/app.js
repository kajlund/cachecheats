const path = require('path');

const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const log = require('./util/logger');
const { connectDB } = require('./db');

log.info('Connecting to DB');
connectDB();

log.info('Creating app and setting port');
const app = express();
app.set('port', parseInt(process.env.PORT, 10) || 3000);
app.set('env', process.env.NODE_ENV || 'production');

/* MIDDLEWARE */
log.info('Adding middleware...');

// Use gzip compression if serving without proxy
log.info('Adding gzip compression middleware');
app.use(compression());

// Handle json and form input
log.info('Adding form and json input handling middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Set security headers
log.info('Set Helmet security headers');
app.use(helmet());

// Prevent XSS attacks
log.info('Prevent XSS attacks');
app.use(xss());

// Prevent http param pollution
log.info('Prevent param pollution');
app.use(hpp());

// Data sanitization to prevent NoSQL query injection
log.info('Prevent NoSQL Query injection');
app.use(mongoSanitize());

// Enable CORS
log.info('Enable CORS');
app.use(cors());

// Serve static files
log.info('Serve public folder');
app.use(
  express.static(path.join(process.cwd(), 'public'), { maxAge: 31557600000 })
);

app.use(require('./middleware/logger'));

// Register Routes
log.info('Registering routes');
app.use('/api/v1/', require('./routes/api/v1/base'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/municipalities', require('./routes/api/v1/municipalities'));
app.use('/api/v1/cachetypes', require('./routes/api/v1/cachetypes'));

// any route not caught at this point returns 404
app.all('*', (req, res, next) => {
  res
    .status(404)
    .json({ success: false, error: `Not Found ${req.originalUrl}` });
});

/* catch-all route errors */
app.use(require('./middleware/error'));

module.exports = app;
