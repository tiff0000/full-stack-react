const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/authenticate');
const tickets = require('../routes/tickets');
const offers = require('../routes/offers');
const issues = require('../routes/issues');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/tickets', tickets);
  app.use('/api/offers', offers);
  app.use('/api/issues', issues);
}
