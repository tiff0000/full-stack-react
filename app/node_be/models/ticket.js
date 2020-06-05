const mongoose = require('mongoose');
const Joi = require('joi');


const ticketSchema = new mongoose.Schema({
	professor_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	status: {
		type: String,
		required: true,
		enum: ['granted', 'redeemed'],
		lowercase: true,
		trim: true
	},
	type: {
		type: String,
		required: true,
		enum: ['domestic', 'international'],
		lowercase: true,
		trim: true
	},
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
	created_on: { type: Date, default: Date.now },
	updated_on: { type: Date }
});


function validateTicket(ticket) {
	const schema = {
		professor_id: Joi.objectId().required(),
		status: Joi.string().valid('granted', 'redeemed').required(),
		type: Joi.string().valid('domestic', 'international').required(),
		created_by: Joi.string().min(1).max(255).required(),
		created_by_id: Joi.objectId().required(),
		created_on: Joi.date().timestamp()
	};

	return Joi.validate(ticket, schema);
};


module.exports.Ticket = mongoose.model('Ticket', ticketSchema);
module.exports.validate = validateTicket;
