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
    },
    items: {
    	type: Sequelize.ARRAY(Sequelize.JSON),
    	allowNull: true
    }
});

module.exports = cart;