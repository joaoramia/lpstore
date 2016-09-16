var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var cart = db.model('cart');

module.exports = router;

router.get('/', function (req, res, next) {
	cart.findAll()
	.then(function(carts) {
		res.json(carts)
	})
	.catch(next);
});

router.get('/:userId', function (req, res, next) {
	cart.findOne({
		where: {userId: req.params.userId}
	})
	.then(function(usercart){
		res.json(usercart);
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	cart.create(req.body)
	.then(function(createdcart){
		return createdcart;
	})
	.then(function(newcart){
		res.status(201).send(newcart);
	})
	.catch(next);
});

router.put('/:cartId', function (req, res, next) {
	cart.findById(req.params.cartId)
	.then(function(usercart){
		return usercart.update(req.body);
	})
	.then(function(updatedcart){
		res.status(200).send(updatedcart);
	})
	.catch(next);
});

router.delete('/:cartId', function (req, res, next) {
	cart.findById(req.params.cartId)
	.then(function(cart){
		return cart.update({userId: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
