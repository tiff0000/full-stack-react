const mongoose = require('mongoose');
const Joi = require('joi');
const { noteSchema } =  require('./note');


const issueSchema = new mongoose.Schema({
  created_by: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255,
    trim: true
	},
  created_by_id: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  },
  title: {
    type: String,
    minlength: 1,
    required: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    minlength: 1,
    required: true,
    lowercase: true,
		trim: true
  },
	status: {
		type: String,
		required: true,
		enum: ['open', 'closed'],
    lowercase: true,
		trim: true,
    default: 'open'
	},
  priority: {
    type: String,
    required: true,
    enum: ['urgent', 'high', 'medium', 'low'],
    lowercase: true,
    trim: true,
  },
  notes: [noteSchema],
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  updated_on: { type: Date },
  closed_on: { type: Date },
  created_on: { type: Date, default: Date.now },
});


function validateIssue(issue) {
	const schema = {
		created_by: Joi.string().min(1).max(255).required(),
    created_by_id: Joi.objectId().required(),
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
		status: Joi.string()
    .valid('open', 'closed').required(),
    priority: Joi.string()
    .valid('urgent', 'high', 'medium', 'low').required(),
    closed_on: Joi.date().timestamp(),
    created_on: Joi.date().timestamp(),
    updated_on: Joi.date().timestamp()
	};

	return Joi.validate(issue, schema);
};


module.exports.Issue = mongoose.model('Issue', issueSchema);
module.exports.validate = validateIssue;
