function withinTimeRange(current_hour, current_min, time) {
    var time_hour = time.getHours(); //sunrise hour
    var time_min = time.getMinutes(); //sunrise minutes
    var timeM_max = time_min + 15;
    var timeH_max = time_hour;
    var timeM_min = time_min - 15;
    var timeH_min = time_hour;
    var withinTimeRange = false;

    //Time range
    if (timeM_max >= 60) {
        timeM_max -= 60;
        timeH_max += 1;
    } else if (timeM_min < 0) {
        timeM_min += 60;
        timeH_min -= 1;
    }

    //check if current time is within the time range
    if (current_hour >= timeH_min && current_hour <= timeH_max) {
        //if current hour is within the sunrise hour range
        if (current_min >= timeM_min && current_min <= timeM_max) {
            withinTimeRange = true;
        }
    }
    return withinTimeRange;
}

function isNight(current_hour, current_min, sunset, sunrise) {
    var sunsetH_max = sunset.getHours();
    var sunsetM_max = sunset.getMinutes() + 15;
    var sunsetH_min = sunset.getHours();
    var sunsetM_min = sunset.getMinutes - 15;

    var sunriseH_max = sunrise.getHours();
    var sunriseM_max = sunrise.getMinutes() + 15;
    var sunriseH_min = sunriseH_max;
    var sunriseM_min = sunrise.getMinutes() - 15;


    if (sunsetM_max >= 60) {
        sunsetM_max -= 60;
        sunsetH_max += 1;
    } else if (sunsetM_min < 0) {
        sunsetM_min += 60;
        sunsetH_min -= 1;
    }

    if (sunriseM_max >= 60) {
        sunriseM_max -= 60;
        sunriseH_max += 1;
    } else if (sunriseM_min < 0) {
        sunriseM_min += 60;
        sunriseH_min -= 1;
    }

    if (current_hour > sunsetH_max) { //pass the sunset max hour range
        return true;
    } else if (current_hour < sunsetH_min) { //not pass the sunset min hour range 
        if (current_hour < sunriseH_min) { //what if current time is 0:15, it is still night, need to check if it is before sunrise
            //implies that the current time is night
            return true;
        } else if (current_hour == sunriseH_min && current_min < sunriseM_min) { //time is before sunrise, so night
            return true
        }
    } else if (current_hour == sunsetH_max && current_min > sunsetM_max) { //if current time is pass the sunset max range.
        return true;
    }
    return false; //implies either sunset or sunrise range or morning or day
}


function getBackground(time) {
    var background_url;
    var current_hour= time[0].getHours(); //current hour
    var current_min = time[0].getMinutes(); //current minutes
    var sunset_time = time[2];
    var sunrise_time= time[1];
    var month       = time[0].getMonth();

    var sunrise     = withinTimeRange(current_hour, current_min, sunrise_time);
    var sunset      = withinTimeRange(current_hour, current_min, sunset_time);
    var night       = isNight(current_hour, current_min, sunset_time, sunrise_time);
    if (month >= 2 && month <= 4) { //spring
        if (night && !sunset) { //if night time
            background_url = "images/night.jpg";
        } else if (sunset) { //if sunset time range
            background_url = "images/sunset.jpg";
        } else { //daytime
            background_url = "images/spring_day.jpg";
        }
    } else if (month >= 5 && month <= 7) { //summer
        if (night && !sunset) { //night
            background_url = "images/night.jpg";
        } else if (sunset) { //sunset
            background_url = "images/summer_set.jpg";
        } else if (current_hour >= 11 && current_hour < sunset.getHours()) {
            //afternoon
            background_url = "images/summer_afternoon.jpg";
        } else { //daytime
            background_url = "images/night.jpg";
        }

    } else if (month >= 8 && month <= 10) { //Fall
        if (night && !sunset) { //night
            background_url = "images/night.jpg";
        } else if (sunset) { //sunset
            background_url = "images/fall_set.jpg";
        } else {
            background_url = "images/fall_day.jpg";
        }
    } else if (month == 0 || month == 1 || month == 11) { //winter
        if (night && !sunset) { //night
            background_url = "images/winter_night_snow.jpg";
        } else if (sunset) { //sunset
            background_url = "images/noon.jpg";
        } else if (sunrise) { //sunrise
            background_url = "images/winter_sunrise.jpg";
        } else { //daytime
            background_url = "images/winter_day.png";
        }
    }
    return background_url;
}

$(document).ready(function() {
    console.log("Jquery Ready");
    var ip_link = "https://ipinfo.io/json";
    console.log(ip_link);
    if (navigator.geolocation || "geolocation" in navigator) {
	  console.log('Geolocation is supported!');
	}
	else {
  		console.log('Geolocation is not supported for this Browser/OS.');	
	}

    $.getJSON(ip_link, function(position) {
        console.log("success to get coordinates");
        var location = position.loc.split(",");
        console.log(location);
        var longitude = location[1];
        var latitude = location[0];
        var weather_link = "https://api.wunderground.com/api/";
        weather_link += "f116132a323e7f5e/astronomy/conditions/q/";
        weather_link += latitude;
        weather_link += "," + longitude + ".json";
        console.log(weather_link);
        //display HTML location
        var location = position.city + ", " + position.country;
        document.getElementById("location").innerHTML = location;

        $.getJSON(weather_link, function(json) {
            const root  = "current_observation";
            var weather = json[root]["weather"];
            var tempC   = json[root].temp_c;
            var tempF   = json[root].temp_f;
            var icon    = json[root]["icon"];

            var date    = new Date();
            var hour    = date.getHours();

            var riseDate= new Date();
            riseDate.setHours(json["sun_phase"]["sunrise"]["hour"]);
            riseDate.setMinutes(json["sun_phase"]["sunrise"]["minute"]);
            var setDate = new Date();
            setDate.setHours(json["sun_phase"]["sunset"]["hour"]);
            setDate.setMinutes(json["sun_phase"]["sunset"]["minute"]);
            var background= getBackground([date, riseDate, setDate]); //get background url 

            var loading   = document.getElementById("loading");
            $(loading).html("");
            $(loading).removeAttr('style');

            var temp = document.getElementById("temp");

            //DISPLAY DATA TO HTML
            $(temp).html(tempC + "&deg;C");
            document.getElementById("weather").innerHTML = weather;
            $(document.getElementById("icon")).html("<i class ='wu wu-white wu-128 wu-" + icon + "'>");
            $(document.body).css('background-image', 'url(' + background + ')');

            //Toggle between farenheit and celcius
            $(temp).click(function() {
                var html = $(this).text().match(/\d*/);
                var type = $(this).text();
                type = type[type.length - 1];
                if (type == "C") {
                    html = tempF;
                    $(temp).html(tempF + "&deg;F");
                } else {
                    $(temp).html(tempC + "&deg;C");
                }
            }); //end of toggle
        }); //end of getJSON
    });
});

if ("geolocation" in navigator) {
    /* geolocation is available */
    console.log("Geolocation is available");
} else {
    /* geolocation IS NOT available */
    console.log("Geolocation is not available");
}
