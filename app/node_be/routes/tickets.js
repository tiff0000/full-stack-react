const { Ticket, validate } = require('../models/ticket');
const authorize = require('../utils/authorize');
const validateObjId = require('../utils/validateObjId');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/all', authorize, async (req, res) => {
  const tickets = await Ticket.find().select('_id');
	res.send(tickets);
});


router.get('/', authorize, async (req, res) => {

  const order = (req.query.order === 'asc') ? 1 : -1;
  const sortBy = (req.query.sort) ? (req.query.sort) : "created_on";
  const tickets = await Ticket
                        .find({created_by_id : req.user._id})
                        .sort({ [sortBy] : order });
	res.send(tickets);
});

router.post('/', authorize, async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let ticket = new Ticket({
    professor_id: req.body.professor_id,
    status: req.body.status,
    type: req.body.type,
    created_by: req.body.created_by,
    created_by_id: req.body.created_by_id
	});

  ticket = await ticket.save();
	res.send(ticket);
});


router.get('/:id', [authorize, validateObjId], async (req, res) => {
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) return res.status(404).send("ticket with given ID was not found");
	res.send(ticket);
});


router.put('/:id', [authorize, validateObjId], async (req, res) => {

  const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const ticket = await Ticket.findByIdAndUpdate(req.params.id,
    {
      professor_id: req.body.professor_id,
      status: req.body.status,
      type: req.body.type,
      created_by: req.body.created_by,
      created_by_id: req.body.created_by_id
    },
    { new : true }
  );
	if (!ticket) return res.status(404).send("ticket with given ID was not found");

	res.send(ticket);
});


router.delete('/:id', [authorize, validateObjId], async (req, res) => {

	const ticket = await Ticket.findByIdAndRemove(req.params.id);
	if (!ticket) return res.status(404).send("ticket with given ID was not found");

	res.send(ticket);
});


module.exports = router;
