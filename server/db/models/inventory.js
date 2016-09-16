'use strict';
var db = require('../_db.js');
var Sequelize = require('sequelize');

var inventory = db.define('inventory', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        // min: 0,
        allowNull: false,
        validate: { min: 0}
    },
    type: {
        type: Sequelize.ENUM,
        values: ['rock', 'jazz'],
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        min: 50,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true
    },
    image_url: {
        type: Sequelize.STRING
    }
});

module.exports = inventory;