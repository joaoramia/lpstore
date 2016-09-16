var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var item = db.model('item');

module.exports = router;

router.get('/', function (req, res, next) {
	item.findAll()
	.then(function(items) {
		res.json(items)
	})
	.catch(next);
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
