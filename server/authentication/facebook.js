'use strict';

var router = require('express').Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../db');
var user = db.model('user');

module.exports = router;

var facebookCredentials = {
    clientID: '252171888512524',
    clientSecret: '27e57eb811ef58518746a5d5f2050f78',
    callbackURL: 'http://vinylstore.herokuapp.com/auth/facebook/callback',
    profileFields: ["id", "emails", "displayName"]
};

var verifyCallback = function (accessToken, refreshToken, profile, done) {
    
    user.findOne({
            where: {
                facebook_id: profile.id
            }
        })
        .then(function (founduser) {
            if (founduser) {
                return founduser;
            } else {
                console.log("profile.emails: ", profile.emails);
                console.log("profile.username.displayName: ", profile.displayName);
                console.log("profile.displayName.join('.') + '@no-email.com': ", profile.displayName.join('.') + '@no-email.com')
                return user.create({
                    facebook_id: profile.id,
                    name: profile.displayName,
                    email: !profile.emails ?  profile.displayName.join('.') + '@no-email.com' : profile.emails[0].value
                });
            }
        })
        .then(function (userToLogin) {
            done(null, userToLogin);
        })
        .catch(function (err) {
            console.error('Error creating user from Facebook authentication', err);
            done(err);
        })

};

passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

router.get('/', function(req, res, next){
    if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
    },
    passport.authenticate('facebook', { scope: 'email'})
);

router.get('/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        var redirect = req.session.oauth2return || '/#'; //the hash here is specific to facebook, as it redirects to #_=_ if not specified
        delete req.session.oauth2return;
        user.findOne({where: {email: req.user.email}})
        .then(function(currentUser){
            req.session.user = currentUser;
            res.redirect(redirect);
        });
    }
);

