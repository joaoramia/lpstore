var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var item = db.model('item');
var inventory = db.model('inventory');

module.exports = router;


router.get('/', function(req, res, next) {
	if (!req.session.items) req.session.items = {};
	res.send(req.session.items);
})

router.post('/add/:id', function (req, res, next) {
	if (!req.session.items) req.session.items = {};

	inventory.findById(req.params.id)
	.then(function(founditem){

		//first we check if this item is already in the list. If not, it will be added as 1
		if(Object.keys(req.session.items).indexOf(founditem.id.toString()) === -1){
			req.session.items[founditem.id] = {quantity: 1};
			req.session.items[founditem.id].title = founditem.title;
			req.session.items[founditem.id].price = founditem.price;
			req.session.items[founditem.id].image_url = founditem.image_url;
			req.session.items[founditem.id].description = founditem.description;
			req.session.items[founditem.id].inStock = founditem.quantity;
		}
		//if it's already in the list, we check if the inventory quantity is enough, if so, we add it
		else if (founditem.quantity > req.session.items[founditem.id].quantity){
			req.session.items[founditem.id].quantity++;
			req.session.items[founditem.id].inStock = founditem.quantity; //in case inventory has changed
		}
		//if there is not enough items, we send a message 'not enough items in stock'
		else {
			return false;
		}
		return req.session.items;
	})
	.then(function(items){
		res.status(201).send(items);
	})
	.catch(next);
});

router.post('/remove/:id', function (req, res, next) {
	if (req.session.items[req.params.id].quantity-- === 1) delete req.session.items[req.params.id];
	res.send(req.session.items);
});

router.get('/:cartId', function (req, res, next) {
	item.findAll({
		where: {cartId: req.params.cartId}
	})
	.then(function(cartitem){
		res.json(cartitem);
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	item.create(req.body)
	.then(function(createditem){
		return createditem;
	})
	.then(function(newitem){
		res.status(201).send(newitem);
	})
	.catch(next);
});

router.put('/:itemId', function (req, res, next) {
	item.findById(req.params.itemId)
	.then(function(changeitem){
		return changeitem.update(req.body);
	})
	.then(function(updateditem){
		res.status(200).send(updateditem);
	})
	.catch(next);
});

router.delete('/:itemId', function (req, res, next) {
	item.findById(req.params.itemId)
	.then(function(item){
		return item.update({cartId: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
