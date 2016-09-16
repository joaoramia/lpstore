/*
	Seed file for testing purposes
*/

var chalk = require('chalk');
var db = require('./server/db');
var user = db.model('user');
var inventory = db.model('inventory');
var address = db.model('address');
var Promise = require('sequelize').Promise;

var seedUsers = function() {

	var users = [{
		name: 'Carl Berg',
		email: 'carl@test.com',
		password: 'password',
		is_admin: true
	}, {
		name: 'Anna Carlsen',
		email: 'anna@test.com',
		password: 'password',
		is_admin: false
	}];

	var creatingUsers = users.map(function(userObj) {
		return user.create(userObj);
	});

	return Promise.all(creatingUsers);

};

var seedInventory = function() {

	var inventories = [{
		title: 'The Doors',
		author: 'The Doors',
		quantity: 4,
		type: 'rock',
		price: 20,
		description: 'The Doors is the self-titled debut album by the American rock band the Doors, released in January 1967. The album features their breakthrough single "Light My Fire" and the lengthy song "The End" with its Oedipal spoken word section.',
		image_url: 'https://images.genius.com/8a56c61fc3f6278bf6c60c674ac7a7e8.953x953x1.jpg'
	}, {
		title: 'Strange Days',
		author: 'The Doors',
		quantity: 10,
		type: 'rock',
		price: 25,
		description: 'Strange Days is the second studio album by the American rock band the Doors, released in September 1967. It was a commercial success, initially earning a gold record and reaching No. 3 on the Billboard 200 albums chart.',
		image_url: 'http://static1.squarespace.com/static/5311d009e4b08cb688151314/5546871ae4b0ba2fd4ee6207/55897d51e4b0157c14e8700e/1435074146773/3486401400_5c3599eb66.jpg?format=500w'
	}, {
		title: 'The Soft Parade',
		author: 'The Doors',
		quantity: 15,
		type: 'rock',
		price: 25,
		description: 'The Soft Parade is the fourth studio album by the American rock band the Doors, and was released on July 18, 1969, on Elektra Records. It saw the group departing from the material that encompassed their past three albums.',
		image_url: 'http://www.thedoors.com/wp-content/uploads/2016/04/71xT8N9hyrL._SL1500_.jpg'
	}, {
		title: 'Animalisms',
		author: 'The Animals',
		quantity: 10,
		type: 'rock',
		price: 2,
		description: 'Animalisms is the third British album by British group the Animals. It has a track listing generally similar to the American version, Animalization, that was released two months later.',
		image_url: 'https://pamemousiki.files.wordpress.com/2009/08/the_animals_animalisms_2003_retail_cd-back.jpg'
	}];

	var creatingInventory = inventories.map(function(inventoryObj) {
		return inventory.create(inventoryObj);
	});

	return Promise.all(creatingInventory);

};

var seedAddress = function() {

	var addresses = [{
		instructions: "Take the x Road",
		is_primary: true,
		street_1: "First North",
		state: "NY",
		city: "NYC",
		zip: "11211",
		userId: 1
	}, {
		instructions: "Take the y Road",
		is_primary: false,
		street_1: "Second North",
		state: "UT",
		city: "Provo",
		zip: "2435",
		userId: 2
	}];

	var creatingAddresses = addresses.map(function(addressObj) {
		return address.create(addressObj);
	});

	return Promise.all(creatingAddresses);

};

db.sync({ force: true })
.then(function() {
	return seedUsers();
})
.then(function() {
	return seedInventory();
})
.then(function(){
	return seedAddress();
})
.then(function() {
	console.log(chalk.green('Seed successful!'));
	process.kill(0);
})
.catch(function(err) {
	console.error(err);
	process.kill(1);
});