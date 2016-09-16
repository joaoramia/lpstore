'use strict';

var Sequelize = require('sequelize');

module.exports = new Sequelize("postgres://localhost:5432/vinyl", {
	logging: false
});