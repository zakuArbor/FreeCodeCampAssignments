var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
require('dotenv').load();
var port = process.env.PORT;
var server_ip = process.env.SERVER_IP;
var max_size = 10 * 1024 * 1024; //bytes
var dest = '/tmp/micro_file_uploads';
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/file-size/', multer({ dest: dest, limits:{fileSize: max_size}}).single('file'), function (req, res, next) {
	try {
		res.json({size: req.file.size});
	} catch (err) {
		res.sendStatus(400);
	}
	console.log(dest + '/' + req.file.filename);
	fs.unlink(dest + '/' +req.file.filename, function(error) {
	    	if (error) {
        		throw error;
    		}
    		console.log('Deleted uploaded file');
	});
});

app.use(function(err, req, res, next) {
  console.log('ERROR');
  res.status(500);
  res.end('File exceeded 10mb limit');
  console.error(err.stack);
});

app.listen(port, server_ip);
