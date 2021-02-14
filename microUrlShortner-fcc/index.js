var express = require('express');
var mod = require('./url-shortner-func.js');
var mongo = require('mongodb').MongoClient;
var path = require('path');
require('dotenv').load();
var ip = process.env.IP;
var port = process.env.PORT;
var app_link = ip + ":" + port + "/"
var app_domain_name = process.env.APP_DOMAIN;

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
	res.render('index', {error: false, domain_name: app_domain_name});
});

app.get('/new', function(req, res) {
	res.render('index', {error: true, domain_name: app_domain_name});
});

app.get('/new/:url*', function(req, res) { //:url*  try that
	var url = req.url.toString().split(/(htt.+)/)[1];	
	var json;
	if (mod.isLongUrl(url)) {
		mongo.connect('mongodb://localhost:27017/microServices', function(err, db) {
			if (err) throw err;
			var collection = db.collection('tinyUrl');
			var result = mod.createUrl(collection, url);
			var json = {
				long_url: result.long_url,
				short_url: app_domain_name + result.short_key
			}
			res.json(json); 
			db.close();
		});
	}
	else {
		json = {
			error: "Incorrect usage" + " - usage: " + app_domain_name + "new/http://website.com"
		};
		res.json(json);
	}
});

app.get('/:url*', function(req, res) {
        var short_key = req.url.toString().split('/')[1];
	mongo.connect('mongodb://localhost:27017/microServices', function(err, db) {
                        if (err) throw err;
                        var collection = db.collection('tinyUrl');
			var long_url;
			mod.findUrl(collection, short_key, function(url) {
				if (url) {
					console.log(url);
					res.redirect(url);
				}
				else {
					res.json({error: "url not registered on the database"});
				}
			});
			db.close();
	});
});


app.listen(port, ip);
