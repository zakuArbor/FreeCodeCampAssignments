exports.findUrl = function findUrl(collection, short_key, callback) {
	var link;
	collection.find({
        	short_key: short_key
        }).toArray(function(err, doc) {
        	if (err) throw err;
		if (doc[0]) {
			return callback(doc[0].long_url);
		}
		else {
			callback(null);
		}
        });
	return link;
}

exports.createUrl = function(collection, url) {
        //randomly generate a key using a hash function
	var hashTable = [0, 1, 2, 3, 4, 5, 6,  7, 8, 9, 
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
			'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; 
	var short_key = "";
	var i;
	for (i = 0; i < 6; i++) {
		short_key += hashTable[Math.floor(Math.random() * (26+2+10))];
	}
	var json = {
                long_url: url,
                short_key: short_key
        }
	collection.insert(json, function(err, data) {
		if (err) throw err;
	});
	return json;
}

/*
*
*
*/
exports.isLongUrl = function(url) {
        //checks format
        if (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url)) {
                return true;
        }
        return false;
}

