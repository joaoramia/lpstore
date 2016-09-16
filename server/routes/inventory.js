var express = require('express');
var router = express.Router();
var db = require('../db/_db');
var inventory = db.model('inventory');

module.exports = router;

router.get('/', function (req, res, next) {
	inventory.findAll()
	.then(function(inventories) {
		res.json(inventories)
	})
	.catch(next);
});

router.post('/', function (req, res, next) {
	inventory.create(req.body)
	.then(function(createdinventory){
		return createdinventory;
	})
	.then(function(newinventory){
		res.status(201).send(newinventory);
	})
	.catch(next);
});

router.put('/:inventoryId', function (req, res, next) {
	inventory.findById(req.params.inventoryId)
	.then(function(changeinventory){
		return changeinventory.update(req.body);
	})
	.then(function(updatedinventory){
		res.status(200).send(updatedinventory);
	})
	.catch(next);
});

router.delete('/:inventoryId', function (req, res, next) {
	inventory.findById(req.params.inventoryId)
	.then(function(inventory){
		return inventory.update({userId: null});
	})
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
