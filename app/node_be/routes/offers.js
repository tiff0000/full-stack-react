const { Offer, validate } = require('../models/offer');
const authorize = require('../utils/authorize');
const validateObjId = require('../utils/validateObjId');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', authorize, async (req, res) => {

  const offers = await Offer.find();
	res.send(offers);
});




router.post('/', authorize, async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  const hasTicket = await Offer.findOne({ ticket_id: req.body.ticket_id })
  if (hasTicket) return res.status(404).send("offer with ticket already used");

	let offer = new Offer({

    ticket_id: req.body.ticket_id,
    created_by : req.body.created_by,
    created_by_id : req.body.created_by_id,
    applicant: req.body.applicant,
    type : req.body.type,
    status : req.body.status,
    round : req.body.round

	});

  offer = await offer.save();
	res.send(offer);
});


router.get('/:id', [authorize, validateObjId], async (req, res) => {

	const offer = await Offer.findById(req.params.id);
	if (!offer) return res.status(404).send("offer with given ID was not found");
	res.send(offer);
});


router.put('/:id', [authorize, validateObjId], async (req, res) => {

  const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  let json = {
      ticket_id: req.body.ticket_id,
      created_by : req.body.created_by,
      created_by_id : req.body.created_by_id,
      applicant: req.body.applicant,
      type : req.body.type,
      status : req.body.status,
      round : req.body.round
  };

	const offer = await Offer.findByIdAndUpdate(req.params.id, json, { new : true });
	if (!offer) return res.status(404).send("offer with given ID was not found");

	res.send(offer);
});


router.delete('/:id', [authorize, validateObjId], async (req, res) => {

	const offer = await Offer.findByIdAndRemove(req.params.id);
	if (!offer) return res.status(404).send("offer with given ID was not found");

	res.send(offer);
});


module.exports = router;
