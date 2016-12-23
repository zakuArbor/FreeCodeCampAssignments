


if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
		var api_link = "api.openweathermap.org/data/2.5/weather?lat={";
		api_link += position.coords.latitude + "}&lon={" + position.coords.longitude + "}";
		api_link += "&APPID={b5fa033436df259e1fe280df8a10aff6";
		console.log(api_link);
		$.getJSON(api_link, function(json) {
			$("#data2").html(JSON.stringify(json));
				var weather_info;
				var weather_info = json;

				console.log(weather_info["name"]);

			}); 
	});
}

//api key: b5fa033436df259e1fe280df8a10aff6
//&APPID={b5fa033436df259e1fe280df8a10aff6} 