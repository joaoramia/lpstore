'use strict';
var db = require('./_db');

var address = require('./models/address');
var cart = require('./models/cart');
var inventory = require('./models/inventory');
var item = require('./models/item');
var user = require('./models/user');

//Item relationships
item.belongsTo(cart);
item.belongsTo(inventory);
item.belongsTo(user);

//Cart relationships
cart.belongsTo(user);
cart.belongsTo(address);

//Address relationships
address.belongsTo(user);

module.exports = db;