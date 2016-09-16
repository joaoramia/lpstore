var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var address = db.model('address');

module.exports = router;

router.get('/', function (req, res, next) {
	address.findAll()
	.then(addresses => res.json(addresses))
	.catch(next);
});

router.get('/:userId/all', function (req, res, next) {
	address.findAll({
		where: {userId: req.params.userId}
	})
	.then(function(useraddresses){
		res.json(useraddresses);
	})
	.catch(next);
});

router.get('/:userId/primary', function (req, res, next) {
	address.findOne({
		where: {
			userId: req.params.userId,
			is_primary: true
		}
	})
	.then(function(useraddress){
		res.json(useraddress);
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	address.create(req.body)
	.then(function(createdaddress){
		return createdaddress.reconcilePrimary();
	})
	.then(function(newaddress){
		res.status(201).send(newaddress);
	})
	.catch(next);
});

router.put('/:addressId', function (req, res, next) {
	address.findById(req.params.addressId)
	.then(function(useraddress){
		return useraddress.update(req.body);
	})
	.then(function(updatedaddress){
		return updatedaddress.reconcilePrimary();
	})
	.then(function(updatedaddress){
		res.status(200).send(updatedaddress);
	})
	.catch(next);
});

router.delete('/:addressId', function (req, res, next) {
	address.findById(req.params.addressId)
	.then(function(address){
		return address.update({userId: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
