// Read ENV variables
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const server = app.listen(app.get('port'), () => {
  log.success(`App running on port: ${app.get('port')} in ${app.get('env')} mode.`);
  log.info('Press Ctrl-C to stop\n');
});

process.on('uncaughtException', function (err) {
  log.error('💥 Uncaugt Exception:');
  log.fatal(err.stack || err.message || err);
  process.exit(1);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err) => {
  log.error('💥 Unhandled rejection:');
  log.fatal(err.stack || err.message || err);
  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = server;
