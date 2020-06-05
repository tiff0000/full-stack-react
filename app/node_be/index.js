//set NODE_ENV=development or production
const config = require('config');
//set DEBUg=enabled
const Debugger = require('debug')('DEBUG');
const morgan = require('morgan');
const express = require('express');
const app = express();

console.log('Application Name: ' + config.get('app_name'));
Debugger('Enabled');
if (config.get('env') === 'dev') {
  console.log('Starting Morgan');
  app.use(morgan('tiny'));
};

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/obj-validation')();

Debugger('JWT Key: ' + config.get('jwtPrivateKey'));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`listening on port ${port}...`));

module.exports = server;
