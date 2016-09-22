var express = require('express');
var app = express();
var path = require('path');
// var session = require('client-sessions');
var session = require('express-session');
var db = require('./db');
var user = db.model('user');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var passport = require('passport');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var GoogleStrategy = require('passport-google-oauth20').Strategy;

var dbStore = new SequelizeStore({
    db: db
});

function extractProfile (profile) {
  var imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  };
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../browser')));
app.use(express.static(path.join(__dirname + '/../node_modules')));

// authentication routes for login, logout and signup
app.use('/', require('./authentication'));

app.use(function(req, res, next) {
	if (req.session && req.session.user) {
		user.findOne({ email: req.session.user.email }, function(err, user) {
		if (user) {
			req.user = user;
			delete req.user.password; // delete the password from the session
			req.session.user = user;  //refresh the session value
			res.locals.user = user;
		}
		// finishing processing the middleware and run the route
		next();
		});
	}
	next();
});

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

app.get('/', function (req, res) {
	console.log("redirected correctly");
	res.render(path.join(__dirname + '/../browser/index.html'));
});

var server = app.listen(Number(process.env.PORT) || 3030, function () {
	console.log('App listening on port: ', chalk.blue(Number(process.env.PORT) || '3030'));
});