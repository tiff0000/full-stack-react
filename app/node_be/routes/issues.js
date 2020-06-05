const { Issue, validate } = require('../models/issue');
const { validateNote } =  require('../models/note');
const authorize = require('../utils/authorize');
const admin = require('../utils/admin');
const validateObjId = require('../utils/validateObjId');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// get all issues
router.get('/all', authorize, async (req, res) => {
  const issues = await Issue.find().select('_id');
	res.send(issues);
});

/* Get with query
router.get('/', authorize, async (req, res) => {
  const pageNum = (req.query.page) ? (req.query.page) : 1;
  const pageSize = 7;
  const order = (req.query.order === 'asc') ? 1 : -1;
  const sortBy = (req.query.sort) ? (req.query.sort) : "created_on";
  const issues = await Issue
                        .find({created_by_id : req.user._id})
                        .skip((pageNum - 1) * pageSize)
                        .limit(pageSize)
                        .sort({ [sortBy] : order });
	res.send(issues);
});
*/

router.get('/', authorize, async (req, res) => {
  const order = (req.query.order === 'asc') ? 1 : -1;
  const sortBy = (req.query.sort) ? (req.query.sort) : "created_on";
  const issues = await Issue
                        .find({created_by_id : req.user._id})
                        .sort({ [sortBy] : order });
	res.send(issues);
});

// create a new issue
router.post('/', authorize, async (req, res) => {

	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let issue = new Issue({
    created_by: req.body.created_by,
    created_by_id: req.body.created_by_id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority
	});

  issue = await issue.save();
	res.send(issue);
});


// get an issue by id
router.get('/:id', [authorize, validateObjId], async (req, res) => {

  const issue = await Issue.findById(req.params.id).populate({
      path: 'subscribers',
      select: 'name _id'
    });
	if (!issue) return res.status(404).send("Issue with given ID was not found");
	res.send(issue);
});


// edit an issue
router.put('/:id', [authorize, validateObjId], async (req, res) => {

  const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
  const isOwner = await Issue.findOne({ _id : req.params.id, created_by_id : req.user._id });
  if (!isOwner) return res.status(404).send("issue with given ID was not found");
  const issue = await Issue.findByIdAndUpdate(req.params.id,
    {
      created_by: req.body.created_by,
      description: req.body.description,
      title: req.body.title,
      status: req.body.status,
      priority: req.body.priority
    },
    { new : true }
  );
	if (!issue) return res.status(404).send("database error");
	res.send(issue);
});


// delete an issue
router.delete('/:id', [authorize, validateObjId], async (req, res) => {

  const isOwner = await Issue.findOne({ _id : req.params.id, created_by_id : req.user._id });
  if (!isOwner) return res.status(404).send("issue with given ID was not found");

	const issue = await Issue.findByIdAndRemove(req.params.id);
	if (!issue) return res.status(404).send("database error");
	res.send(issue);
});


// subscribe a user to an issue
router.post('/:id/sub', [authorize, validateObjId], async (req, res) => {

  const issue = await Issue.findOne({ _id : req.params.id});
  if (issue.created_by_id.toString() === req.body.userId.toString()) return res.status(400).send("cannot subscribe to own issue");

  if (issue.subscribers.map( user => user.toString()).includes(req.body.userId)) return res.status(400).send("Already subscribed");

  const result = await Issue.update({ "_id" : req.params.id },
    { $push: { subscribers : req.body.userId }
  });

  res.send(result);
});

// unsubscribe from an issue (only own user can do this for himself)
router.delete('/:id/unsub', [authorize, validateObjId], async (req, res) => {

  const result = await Issue.update({ "_id" : req.params.id },
    { $pull: { subscribers : req.user._id }
  });
  if (!result.nModified) return res.status(404).send("subscriber with given ID was not found");
  res.send(result);
});


// to add note
router.post('/:id/notes', [authorize, validateObjId], async (req, res) => {

  let issue = await Issue.findById(req.params.id);
	if (!issue) return res.status(404).send("issue with given ID was not found");

  const { error } = validateNote(req.body);
	if (error) return res.status(400).send(error.details[0].message);

  const result = await Issue.update({ "_id" : req.params.id },
    { $push: { notes : req.body }
  });
  res.send(result);
});


// to delete a note
router.delete('/:id/notes/:note_id/del', [authorize, validateObjId], async (req, res) => {

  let issue = await Issue.findById(req.params.id);
	if (!issue) return res.status(404).send("issue with given ID was not found");
  const result = await Issue.update({ "_id" : req.params.id },
    { $pull: {notes : { "_id" : req.params.note_id }}
  });
	if (!result.nModified) return res.status(404).send("note with given ID was not found");
	res.send(result);
});


// to edit a note
router.post('/:id/notes/:note_id/edit', [authorize, validateObjId], async (req, res) => {

  let issue = await Issue.findById(req.params.id);
	if (!issue) return res.status(404).send("issue with given ID was not found");

  const result = await Issue.update({ "_id" : req.params.id },
    { $set: { "notes.$[e].message" : req.body.message }},
    { arrayFilters: [{ "e._id": mongoose.Types.ObjectId(req.params.note_id) }]}
  );
	if (!result.nModified) return res.status(404).send("note with given ID was not found");

	res.send(result);
});


module.exports = router;
