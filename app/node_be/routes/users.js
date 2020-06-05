const { User, validate } = require('../models/user');
const authorize = require('../utils/authorize');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();


router.get('/all', authorize, async (req, res) => {

  const users = await User.find().select('_id name usertype issues');
  console.log(users);
  res.send(users);

});


router.get('/self', authorize, async (req, res) => {

  const user = await User.findById(req.user._id).select('issues tickets offers').populate('issues').populate('tickets');
  res.send(user);

});

router.post('/sub', authorize, async (req, res) => {

  const user = await User.findOne({ _id: req.body.userId })
  if (user.issues.map( issue => issue.toString()).includes(req.body.issueId)) return res.status(400).send("Issue already in subscriptions");

  const result = await User.update({ "_id" : req.body.userId },
    { $push: { issues : req.body.issueId }
  });

  res.send(result);
});


router.post('/unsub', authorize, async (req, res) => {

  const result = await User.update({ "_id" : req.user._id },
    { $pull: { issues : req.body.issueId }
  });
  if (!result.nModified) return res.status(404).send("issue subscription with given ID was not found");
  res.send(result);
});

router.post('/grant', authorize, async (req, res) => {

  const user = await User.findOne({ _id: req.body.userId })
  if (user.tickets.map( ticket => ticket.toString()).includes(req.body.ticketId)) return res.status(400).send("Ticket already granted");

  const result = await User.update({ "_id" : req.body.userId },
    { $push: { tickets : req.body.ticketId }
  });

  res.send(result);
});



// create a new user
router.post('/', async (req, res) => {

  const { error } = validate(req.body);
	if (error) return res.status(400).send("error.details[0].message XX");

  let user = await User.findOne( {email: req.body.email} );
  if (user) return res.status(400).send('User already registered');

  user = new User (_.pick(req.body, ['email', 'name', 'password', 'usertype']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'name', 'usertype']));
});

module.exports = router;
