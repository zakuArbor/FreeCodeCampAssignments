var express = require('express');
var body_parser = require('body-parser');
var path = require('path');

var app = express();

/*var logger = function (req, res, next) {
	console.log('Logging...');
	next();
}*/

//app.use(logger);

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/:date', function (req, res) {
	var date = new Date(req.params.date);

	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var timeStamp = {
		unix: date.getTime(),
		natural: month[date.getMonth()] + " " + date.getDay() + ',' + date.getFullYear(),
	}
	//res.render('index', timeStamp);
	res.send(timeStamp);
});	

app.listen(8080, function() {
	console.log('Server Started on Port 8080...');
});
