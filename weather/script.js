
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
                var location = json["name"] + ", " + json["sys"]["country"];
                var weather = json["weather"][0]["main"];
                var temp = json["main"]["temp"];
		var icon_id = json["weather"][0]["id"];
                console.log(icon_id);
            });
        });
    }
});
