if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
	});
}
var weather_info = api.openweathermap.org/data/2.5/weather?lat={position,.coords.latitude}&lon={position.coords.longitude}; 
console.log(weather_info["name"]);
//api key: b5fa033436df259e1fe280df8a10aff6
//&APPID={b5fa033436df259e1fe280df8a10aff6} 