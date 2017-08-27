var express = require('express');
var body_parser = require('body-parser');
var path = require('path');

var app = express();

var logger = function (req, res, next) {
	console.log('Logging...');
	next();
}

app.use(logger);

app.get('/', function (req, res) {
	res.send('Hello World!');
});	

app.listen(8080, function() {
	console.log('Server Started on Port 8080...');
});
