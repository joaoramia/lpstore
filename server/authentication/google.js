'use strict';

var router = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var db = require('../db');
var user = db.model('user');

//to get local ip for the callbackURL (currently not in use):
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

module.exports = router;

var googleCredentials = {
    clientID: '824703239137-t07hihd911u5bvkai3v4eg6i1oafu1vc.apps.googleusercontent.com',
    clientSecret: '4xD6FZIFT_uXrAjPzvb3AiPx',
    callbackURL: 'http://54.173.229.200:3030/auth/google/callback' //to be updated
};

var verifyCallback = function (accessToken, refreshToken, profile, done) {
    user.findOne({
            where: {
                google_id: profile.id
            }
        })
        .then(function (userfound) {
            if (userfound) {
                return userfound;
            } else {
                return user.create({
                    google_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : [profile.username , 'no-email.com'].join('@')
                });
            }
        })
        .then(function (userToLogin) {
            done(null, userToLogin);
        })
        .catch(function (err) {
            console.error('Error creating user from Google authentication', err);
            done(err);
        });

};

passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

router.get('/', function (req, res, next) {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        var redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        user.findOne({where: {email: req.user.email}})
        .then(function(currentUser){
            req.session.user = currentUser;
            res.redirect(redirect);
        });
    }
);






