'use strict';
var db = require('../_db.js');
var Sequelize = require('sequelize');

var address = db.define('address', {
    instructions: {
        type: Sequelize.TEXT
    },
    is_primary: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    street_1: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    street_2: {
        type: Sequelize.STRING
    },        
    state: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    zip: {
        type: Sequelize.STRING,
        len: [5, 10],
        allowNull: false
    }
});

module.exports = address;