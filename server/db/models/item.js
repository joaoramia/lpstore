'use strict';
var db = require('../_db.js');
var Sequelize = require('sequelize');

var item = db.define('item', {
    quantity: {
        type: Sequelize.INTEGER,
        min: 1,
        allowNull: false
    }
});

module.exports = item;