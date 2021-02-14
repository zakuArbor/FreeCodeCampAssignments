var express = require('express');
var parser = require('ua-parser-js');

var app = express();
app.set('trust proxy', true);

app.get('/', function(req, res) {
    // get user-agent header 
    var ua = parser(req.headers['user-agent']);
    // write the result as response
	var header = {
		ipaddress: req.ip,
		language: req.headers["accept-language"].split(",")[0],
		OS: ua.os.name + " " + ua.os.version
	};
    
    res.json(header);
}).listen(8081, '159.203.23.199');
