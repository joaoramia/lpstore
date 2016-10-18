'use strict';

var Sequelize = require('sequelize');

// module.exports = new Sequelize("postgres://amgxsfwtfcuvdj:ZAXnxHB1zE2ZWW-uvjNxNWS53n@ec2-54-243-52-209.compute-1.amazonaws.com:5432/ddb391b5gg8vmn", {
module.exports = new Sequelize("postgres://localhost:5432/vinyl", {	
	logging: false
});