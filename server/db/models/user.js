'use strict';
var db = require('../_db.js');
var Sequelize = require('sequelize');

var user = db.define('user', {
    is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    reset: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING
    },
    twitter_id: {
        type: Sequelize.STRING
    },
    facebook_id: {
        type: Sequelize.STRING
    },
    google_id: {
        type: Sequelize.STRING
    }
});

module.exports = user;