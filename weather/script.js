
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $("#data").html("latitude: " + position.coords.latitude + 
			    "<br>longitude: " + position.coords.longitude);

            var weather_link = "http://api.openweathermap.org/data/2.5/weather";
	    weather_link += "?lat=" + position.coords.latitude;
            weather_link += "&lon=" + position.coords.longitude;
            weather_link += "&APPID=b5fa033436df259e1fe280df8a10aff6";
            $.getJSON(weather_link, function(json) {
                console.log(json);
                var city = json["name"];
                var weather_desc = json["weather"];
                var temp = json["main"];
                var country = json["country"];
                console.log(weather_link);
                console.log(city);
            });
        });
    }
});
