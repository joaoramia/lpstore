var express = require('express');
var app = express();
var path = require('path');
var db = require('./db');

app.use(express.static(path.join(__dirname + '/../browser')));
app.use(express.static(path.join(__dirname + '/../node_modules')));

// Routes that will be accessed via AJAX should be prepended with
    // /api so they are isolated from our GET /* wildcard.
    app.use('/api', require('./routes'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../browser/index.html'));
});

var server = app.listen(Number(process.env.PORT) || 3030, function () {
  console.log('App listening on port 3030!');
});