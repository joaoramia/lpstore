var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var cart = db.model('cart');
var item = db.model('item');
var inventory = db.model('inventory');

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

router.post('/purchase', function (req, res, next) {

	var stripe = require("stripe")("sk_test_6iuyDpMMyTWKZB4PVOvcCA3P");

	var stripeToken = req.body.id;

	var price = 0;

	//calculate total price
	for (var key in req.session.items){
		price += req.session.items[key].quantity * req.session.items[key].price;
	}

	//update inventory quantities
	Promise.all(Object.keys(req.session.items).map(function(id){
		return inventory.findById(id)
		.then(function(founditem){
			founditem.update({quantity: founditem.quantity - req.session.items[id].quantity});
		})
	}))
	.then(function(){
		//make the actual charge via stripe
		var charge = stripe.charges.create({
			amount: price*100, // amount in cents, again
			currency: "usd",
			source: stripeToken,
			description: "Example charge"
	    }, function(err, charge) {
			if (err && err.type === 'StripeCardError') {
			// The card has been declined
			}
	    })
	})
	.then(function(){
	    //create new cart in case there was a logged user:
	    if(req.session.user){
	    	if (!req.session.user.cart){
	    		return cart.create({status: 'complete', userId: req.session.user.id, items: req.session.items})
	    	}
	    	else {
	    		return req.session.user.cart.update({items: req.session.user.cart.items.push(req.session.items)})
	    	}
	    }
	})
	.then(function(){
		delete req.session.items;
		res.send('test');
	})

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
