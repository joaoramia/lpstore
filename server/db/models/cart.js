'use strict';
var db = require('../_db.js');
var item = require('./item.js');
var Sequelize = require('sequelize');

var cart = db.define('cart', {
	    date: {
	        type: Sequelize.DATE,
	        defaultValue: function (){ return new Date(); }
	    },
	    status: {
	        type: Sequelize.ENUM,
	        values: ['complete', 'cancelled', 'pending'],
	        defaultValue: 'pending'
	    }
	},
	{
        defaultScope: {
            include: [item]
        }
    }
);

module.exports = cart;