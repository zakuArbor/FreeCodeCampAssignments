var express = require('express');
var keys = require('./key.js');
var GoogleSearch = require('google-search');
var mongo = require('mongodb').MongoClient;
var path = require('path');

var googleSearch = new GoogleSearch({
  key: keys.api_key,
  cx: keys.search_engine_id
});

var server_ip = keys.server_ip;
var port = keys.port_num;
var app_domain_name = keys.domain_name;
var app = express();

function exeDB_OP(operation, obj) {
	mongo.connect('mongodb://localhost:27017/microServices', function(err, db) {
		if (err) throw err;
		operation(db, obj);
	});
}

function fetchLatestSearch(db, res) {
	console.log("before search");
	var collection = db.collection('imageSearch');
//	console.log(db);
	collection.find().sort({timestamp:-1}).toArray(function(err, results){
		if (err) throw err;
		var json = [];
		if (results) {
			var i;
			for (i = 0; i < results.length && i < 10; i++) {
				json[i] = {query: results[i].query, timestamp: results[i].timestamp}
			}
			if (i < results.length && results.length >= 25) {
				collection.remove({"timestamp": { "$lt": new Date(results[i-1].timestamp)} } );
				db.close();
			}
			else {
				db.close();
			}
		}
		res.json(json);
	});
}

function recordSearch(db, query) {
	var collection = db.collection('imageSearch');
	collection.insert({
		query: query,
		timestamp: new Date()
	}, function (err) {if (err) throw err;});
	db.close();
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
	res.render('index', {app_domain_name: app_domain_name});
});

app.get('/latest/', function(req, res) {
	exeDB_OP(fetchLatestSearch, res);
});

app.get('/search/:img_desc', function(req, res) {
	var num = 10;
	if (req.query.offset && /^[0-9]+$/.test(req.query.offset)) {
		if (req.query.offset > 0 && req.query.offset <= 10) { //google api only allows 1-10 results
			num = req.query.offset;
		}
	}
	exeDB_OP(recordSearch, req.params.img_desc);
	googleSearch.build({
		q: req.params.img_desc,
		safe: 'medium',
		searchType: 'image',	
		num: num, // Number of search results to return between 1 and 10, inclusive 
	}, function(error, response) {
		if (response.items) {
			var json = [];
			for (var i = 0; i < response.items.length; i++) {
				json[i] = {
					url: response.items[i].link,
					snippet: response.items[i].snippet,
					thumbnail: response.items[i].image.thumbnailLink,
					context: response.items[i].image.contextLink
					};
			}
			res.json(json);
		}
	});
});

app.listen(port, server_ip);
