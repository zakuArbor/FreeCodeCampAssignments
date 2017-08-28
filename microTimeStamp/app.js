var express = require('express');
var moment= require('moment');
var body_parser = require('body-parser');
var path = require('path');

var app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/:date', function (req, res) {
	var date;
	if (req.params.date && 
		(new Date(req.params.date) &&  (date = moment(new Date(req.params.date).toISOString()))) || 
		((date = moment(req.params.date)))) {
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
	}
	else {
		res.render('index', timeStamp);
	}

});	

app.listen(8080, function() {
	console.log('Server Started on Port 8080...');
});
