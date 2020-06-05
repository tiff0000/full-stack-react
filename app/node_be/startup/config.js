const config = require('config');

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey not defined');
    process.exit(1);
  }
};
