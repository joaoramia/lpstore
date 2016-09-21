var express = require('express');
var app = express();
var path = require('path');
var session = require('client-sessions');
var db = require('./db');
var user = db.model('user');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + '/../browser')));
app.use(express.static(path.join(__dirname + '/../node_modules')));


app.use(session({
	cookieName: 'session',
	secret: 'testrandom',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true,
	secure: true,
	ephemeral: true
}));

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
	req.session.reset();
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
	console.log('App listening on port 3030!');
});