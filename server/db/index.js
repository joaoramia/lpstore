'use strict';
var db = require('./_db');
module.exports = db;

var address = require('./models/address');
var cart = require('./models/cart');
var inventory = require('./models/inventory');
var item = require('./models/item');
var user = require('./models/user');

//Item relationships
item.belongsTo(cart);
item.belongsTo(inventory);

//Cart relationships
cart.belongsTo(user);
cart.belongsTo(address);
cart.hasMany(item);

//Address relationships
address.belongsTo(user);

db.sync();