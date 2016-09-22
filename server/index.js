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
// var MemcachedStore = require('connect-memcached')(session);
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

// app.use(session({
// 	cookieName: 'session',
// 	secret: 'testrandom',
// 	duration: 30 * 60 * 1000,
// 	activeDuration: 5 * 60 * 1000,
// 	httpOnly: true,
// 	secure: true,
// 	ephemeral: true
// }));

app.use(session({
    genid: function(req) {
      return req.headers.host // use UUIDs for session IDs
    },
    secret: 'testrandom',
    // store: dbStore,
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and also allow it to read
// the request session information.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: '824703239137-t07hihd911u5bvkai3v4eg6i1oafu1vc.apps.googleusercontent.com',
  clientSecret: '4xD6FZIFT_uXrAjPzvb3AiPx',
  callbackURL: 'https://lpstore.appspot.com/auth/google/callback',
  accessType: 'offline'
}, function (accessToken, refreshToken, profile, cb) {
  // Extract the minimal profile information we need from the profile object
  // provided by Google
  cb(null, extractProfile(profile));
}));

 // When we give a cookie to the browser, it is just the userId (encrypted with our secret).
passport.serializeUser(function (user, done) {
    done(null, user.id)
});

// When we receive a cookie from the browser, we use that id to set our req.user
// to a user found in the database.
passport.deserializeUser(function (req, id, done) {
    user.findById(id)
        .then(function (user) {
            done(null, user);
        })
        .catch(done);
});


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

app.post('/login', function(req, res) {
	user.findOne({where: {email: req.body.email}})
	.then(function(currentUser){
		if (!currentUser || !currentUser.correctPassword(req.body.password)){
			res.send(false);
		} else {
	        // sets a cookie with the currentUser's info
	        req.session.user = currentUser;
	        res.send(true);
		}
	});
});

app.post('/signup', function(req, res, next) {
	user.create(req.body)
	.then(function(newuser){
		req.session.user = newuser;
		res.send(true);
	})
	.catch(next);
});

app.get('/logout', function(req, res) {
	// req.session.reset();
	req.logout();
	req.session.user = null;
	res.send(false);
});

app.get('/logged', function(req, res) {
	res.send(req.session.user);
});

// Routes that will be accessed via AJAX should be prepended with
// /api so they are isolated from our GET /* wildcard.
app.use('/api', require('./routes'));

app.get('/', function (req, res) {
	res.render(path.join(__dirname + '/../browser/index.html'));
});

var server = app.listen(Number(process.env.PORT) || 3030, function () {
	console.log('App listening on port: ', chalk.blue(Number(process.env.PORT) || '3030'));
});