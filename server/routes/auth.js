// var express = require('express');
// var router = express.Router();
// var db = require('../db/_db');
// var user = db.model('user');

// module.exports = router;

// router.post('/login', function (req, res, next) {
// 	user.create(req.body)
// 	.then(function(createduser){
// 		console.log(createduser);
// 		return createduser;
// 	})
// 	.then(function(newuser){
// 		res.status(201).send(newuser);
// 	})
// 	.catch(next);
// });