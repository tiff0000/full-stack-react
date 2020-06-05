const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50,
    trim: true
	},
  usertype: {
    type: String,
    required: true,
    enum: ['faculty', 'budget_office', 'grad_office'],
    lowercase: true,
		trim: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  issues: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue'
  }],
  tickets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  }],
  offers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offer'
  }],
  created_on: { type: Date, default: Date.now },
  last_login: { type: Date }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, name: this.name, usertype: this.usertype, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

function validateUser(user) {
	const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
    name: Joi.string().min(1).max(50).required(),
		usertype: Joi.string()
    .valid('faculty', 'budget_office', 'grad_office').required(),
    isAdmin: Joi.boolean().required(),
    created_on: Joi.date().timestamp(),
    last_login: Joi.date().timestamp()
	};

	return Joi.validate(user, schema);
};

function validateCredentials(user) {
	const schema = {
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
	};

	return Joi.validate(user, schema);
};


module.exports.User = mongoose.model('User', userSchema);
module.exports.validate = validateUser;
module.exports.validateCredentials = validateCredentials;
