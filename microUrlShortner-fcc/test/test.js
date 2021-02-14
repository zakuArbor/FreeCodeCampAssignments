var chai = require('chai');
var mod = require('../url-shortner-func.js');

var assert = chai.assert;

//test isLongUrl
describe('isLongUrl', function() {
	var false_url = ['h', '1', 'ht', 'htt', 'http', 'http:', "http://", "http://test.", "http://..", "https://##/",
			"http://.", "http://..", "http://../", "http://?", "http://??", "http://??/", "http://#", 
			"http://##", "http://##/", "http://foo.bar?q=Spaces should be encoded", "//", "//a", 
			"///a", "///", "http:///a", "foo.com", "rdar://1234", "h://test", "http:// shouldfail.com", 
			":// should fail", "http://foo.bar/foo(bar)baz quux", "ftps://foo.bar/", "http://-error-.invalid/"
			];
	false_url.forEach(function(url) {
		it(url + ': should be false', function() {
			assert.equal(mod.isLongUrl(url), false);
		});
	});
	var true_url = [
			"http://test.com", "http://example.com", "https://example.com", "https://test.com",
			'https://github.com/zakuArbor/microUrlShortner', 'https://github.com/Unitech/pm2/issues/133', 
			'https://github.com/zakuArbor/request_header_parser-fcc', 'https://code.lengstorf.com/deploy-nodejs-ssl-digitalocean/',
			"http://foo.com/blah_blah", "http://foo.com/blah_blah/", "http://foo.com/blah_blah_(wikipedia)",
                        "http://foo.com/blah_blah_(wikipedia)_(again)", "http://www.example.com/wpstyle/?p=364",
                        "https://www.example.com/foo/?bar=baz&inga=42&quux", "http://✪df.ws/123", "http://userid:password@example.com:8080",
                        "http://userid:password@example.com:8080/", "http://userid@example.com", "http://userid@example.com/",
                        "http://userid@example.com:8080", "http://userid@example.com:8080/", "http://userid:password@example.com",
                        "http://userid:password@example.com/", "http://142.42.1.1/", "http://142.42.1.1:8080/",
                        "http://➡.ws/䨹", "http://⌘.ws", "http://⌘.ws/", "http://foo.com/blah_(wikipedia)#cite-1",
                        "http://foo.com/blah_(wikipedia)_blah#cite-1", "http://foo.com/unicode_(✪)_in_parens",
                        "http://foo.com/(something)?after=parens", "http://☺.damowmow.com/", "http://code.google.com/events/#&product=browser",                        "http://j.mp", "ftp://foo.bar/baz", "http://foo.bar/?q=Test%20URL-encoded%20stuff", "http://ﻢﺛﺎﻟ.ﺈﺨﺘﺑﺍﺭ",
                        "http://例子.测试", "http://1337.net", "http://a.b-c.de", "http://223.255.255.254" 
			];
	true_url.forEach(function(url) {
		var msg = url + ":should be true";
		console.log(url);
		it(msg, function() {
			assert.equal(mod.isLongUrl(url), true);
		});
	});	
});
