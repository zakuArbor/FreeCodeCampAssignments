var express = require('express');
var moment= require('moment');
var body_parser = require('body-parser');
var path = require('path');

var app_domain_name = "http://timestamp.juhongkim.tk/";

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('index', {app_domain_name: app_domain_name});
});

app.get('/:date', function (req, res) {
	var date;
	
	if (/^[0-9]+$/.test(req.params.date)) {
		date = moment(req.params.date, 'X');
	}
	else {
		date = moment(req.params.date);
	}
	var unix, natural;
	if (date.isValid()) {
		unix =  date.unix();
		natural =  date.format('LL');
	}
	else {
		unix = null;
		natural = null;
	}
	var timeStamp = {
		unix: unix,
		natural: natural
	};
	res.json(timeStamp);
});	

app.listen(8080, '159.203.23.199');
console.log('MicroTimeStamp running at http://159.203.23.199:8080/');
