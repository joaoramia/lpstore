var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var user = db.model('user');

module.exports = router;

router.get('/', function (req, res, next) {
	user.findAll()
	.then(function(users) {
		res.json(users)
	})
	.catch(next);
});

router.get('/:id', function (req, res, next) {
	user.findAll({
		where: {id: req.params.id}
	})
	.then(function(user){
		res.json(user);
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	user.create(req.body)
	.then(function(createduser){
		return createduser;
	})
	.then(function(newuser){
		res.status(201).send(newuser);
	})
	.catch(next);
});

router.put('/:id', function (req, res, next) {
	user.findById(req.params.id)
	.then(function(changeuser){
		return changeuser.update(req.body);
	})
	.then(function(updateduser){
		res.status(200).send(updateduser);
	})
	.catch(next);
});

router.delete('/:id', function (req, res, next) {
	user.findById(req.params.id)
	.then(function(user){
		return user.update({id: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
