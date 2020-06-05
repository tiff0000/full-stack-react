const { User, validateCredentials } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/', async (req, res) => {

  const { error } = validateCredentials(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne( {email: req.body.email} );
  if (!user) return res.status(400).send('Invalid email or password');


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  let authRes = {
    userId: user._id,
    name: user.name,
    email: user.email,
    usertype: user.usertype,
    isAdmin: user.isAdmin,
    token: token
  }
  res.send(authRes);
});


module.exports = router;
