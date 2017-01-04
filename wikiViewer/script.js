$(document).ready(function(){
	$(document.getElementById("search_icon")).click(function() {
		var search = document.getElementById("search_input").value;
		var url = "https://en.wikipedia.org/w/api.php?action=";
	url += "opensearch&search=" + search + "&profile=classic&format=json";
	console.log(url);
	});
});