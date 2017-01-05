$(document).ready(function(){
	$(document.getElementById("search_icon")).click(function() {
		var search = document.getElementById("search_input").value;
		var url = "https://en.wikipedia.org/w/api.php?format=json&action=";
		//url += "opensearch&search=" + search + "&profile=classic";
		url += "query&generator=search&gsrnamespace=0&gsrsearch=";
		url += search + "&gsrlimit=10&prop=extracts&pilimit=max&";
		url += "exintro&explaintext&exsentences=1&exlimit=max";
		url += "&callback=?";
		console.log(url);
		$.getJSON(url, function(json){
			console.log(json);
		});
	});
});
