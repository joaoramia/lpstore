'use strict';

var Sequelize = require('sequelize');

module.exports = new Sequelize("postgres://vinylstore.herokuapp.com:5432/vinyl", {
	logging: false
});