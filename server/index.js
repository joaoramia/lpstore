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
	console.log("logging in");
	user.findOne({where: {email: req.body.email}})
	.then(function(currentUser){
		if (!currentUser){
			console.log('NotCurrentUser: ', currentUser);
			// res.send('Invalid email or password.');
			res.send(false);
		} else {
			if (req.body.password === currentUser.password) {
		        // sets a cookie with the currentUser's info
		        req.session.user = currentUser;
				console.log("YES!");
		        // res.redirect('/');
		        res.send(true);
		    } else {
		    	res.send(false);
		    	// res.send('Invalid email or password.');
		    }
		}
	});
});

app.get('/logout', function(req, res) {
	console.log('loggin out');
	req.session.reset();
	// res.redirect('/');
	res.send(false);
});

app.get('/logged', function(req, res) {
	console.log('checking logged user: ', req.session.user);
	// res.redirect('/');
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