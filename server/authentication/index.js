'use strict';
var router = require('express').Router();
var session = require('express-session');
var db = require('../db');
var user = db.model('user');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports = router;

router.use(session({
    genid: function(req) {
      return req.headers.host // use UUIDs for session IDs
    },
    secret: 'testrandom',
    resave: false,
    saveUninitialized: false
}));

// Initialize passport and also allow it to read
// the request session information.
router.use(passport.initialize());
router.use(passport.session());

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

router.use('/auth/google', require('./google'));
router.use('/auth/facebook', require('./facebook'));
// router.use('/auth/twitter', require('./twitter'));

router.post('/login', function(req, res) {
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

router.post('/signup', function(req, res, next) {
	user.create(req.body)
	.then(function(newuser){
		req.session.user = newuser;
		res.send(true);
	})
	.catch(next);
});

router.get('/logout', function(req, res) {
	req.logout();
	req.session.user = null;
	res.send(false);
});

router.get('/logged', function(req, res) {
	res.send(req.session.user);
});