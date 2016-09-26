'use strict';

var Sequelize = require('sequelize');

module.exports = new Sequelize("postgres://54.173.229.200:5432/vinyl", {
	logging: false
});