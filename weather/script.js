function celciusToFarenheit(temp) {
    return temp * 9/5 + 32;
}

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
    timeH_max +=1;
  }
  else if (timeM_min < 0) {
    timeM_min += 60;
    timeH_min -=1;
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
	var sunsetM_min = sunset.getMinutes -15;

	var sunriseH_max = sunrise.getHours();
	var sunriseM_max = sunrise.getMinutes() + 15;
	var sunriseH_min = sunriseH_max;
	var sunriseM_min = sunrise.getMinutes() - 15;

	
	if (sunsetM_max >= 60) {
	    sunsetM_max -= 60;
	    sunsetH_max +=1;
	}
	else if (sunsetM_min < 0) {
    	    sunsetM_min += 60;
    	    sunsetH_min -=1;
        }

	if (sunriseM_max >= 60) {
            sunriseM_max -= 60;
            sunriseH_max +=1;
        }
        else if (sunriseM_min < 0) {
            sunriseM_min += 60;
            sunriseH_min -=1;
        }

	if (current_hour > sunsetH_max) { //pass the sunset max hour range
		return true;
	}
	else if (current_hour < sunsetH_min) { //not pass the sunset min hour range 
		if (current_hour < sunriseH_min) { //what if current time is 0:15, it is still night, need to check if it is before sunrise
			//implies that the current time is night
			return true;
		}
		else if (current_hour == sunriseH_min && current_min < sunriseM_min) { //time is before sunrise, so night
			return true
		}
	}
	else if (current_hour == sunsetH_max && current_min > sunsetM_max) { //if current time is pass the sunset max range.
		return true;
	}
	return false; //implies either sunset or sunrise range or morning or day
}


function getBackground (time) {
  var background_url;
  var current_hour = time[0].getHours(); //current hour
  var current_min = time[0].getMinutes(); //current minutes
  var sunset_time = time[2];
  var sunrise_time = time[1];
  var month = time[0].getMonth();

  var sunrise = withinTimeRange(current_hour, current_min, sunrise_time);
  var sunset  = withinTimeRange(current_hour, current_min, sunset_time);
  var night = isNight(current_hour,current_min,sunset_time, sunrise_time);
  console.log(night);
  if (month >= 2 && month  <=4) { //spring
    if (night && !sunset) { //if night time
      background_url = "images/night.jpg";
    }
    else if (sunset) { //if sunset time range
      background_url = "images/sunset.jpg";
    }
    else { //daytime
      background_url = "images/spring_day.jpg";
    }
  }
  else if (month >= 5 && month <= 7) { //summer
    if (night && !sunset) { //night
      background_url = "images/night.jpg";
    }
    else if (sunset) { //sunset
      background_url = "images/summer_set.jpg";
    }
    else if (current_hour >=11 && current_hour < sunset.getHours()) { 
      //afternoon
      background_url = "images/summer_afternoon.jpg";
    }
    else { //daytime
      background_url = "images/night.jpg";
    }

  }
  else if (month >= 8 && month <= 10) { //Fall
    if (night && !sunset) { //night
      background_url = "images/night.jpg";
    }
    else if (sunset) { //sunset
      background_url = "images/fall_set.jpg";
    }
    else {
      background_url = "images/fall_day.jpg";
    }
  }
  else if (month == 0 || month == 1 || month == 11) { //winter
    if (night && !sunset) { //night
      background_url = "images/winter_night_snow.jpg";
    }
    else if (sunset) { //sunset
      background_url = "images/noon.jpg";
    }
    else if (sunrise) { //sunrise
      background_url = "images/winter_sunrise.jpg";
    }
    else { //daytime
      background_url = "images/winter_day.png";
    }
  }
  return background_url;
}

var test = "hello";
var tempC;
var tempF;

$(document).ready(function () {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var weather_link = "http://api.openweathermap.org/data/2.5/weather";
          weather_link += "?lat=" + position.coords.latitude;
          weather_link += "&lon=" + position.coords.longitude;
          weather_link += "&APPID=b5fa033436df259e1fe280df8a10aff6";
          $.getJSON(weather_link, function(json) {
              var location = json["name"] + ", " + json["sys"]["country"];
              var weather = json["weather"][0]["main"];
              tempC = (json["main"]["temp"] -273.15).toFixed(1); //calvin -273.15 = Celcius
              tempF = (celciusToFarenheit(tempC)).toFixed(1); //current temperature in Farenheit
              var icon_id = json["weather"][0]["id"]; //icon 

              var date = new Date();
              var hour = date.getHours();

              var day = '';
              if (hour >=6 && hour <= 20) {
                day = 'd';
              }
              else {
                day = 'n';
              }

              //sunset and sunrise time are given at UTC time
              var riseDate = new Date(json["sys"]["sunrise"]*1000); 
              var setDate = new Date(json["sys"]["sunset"]*1000);
              var background = getBackground([date,riseDate, setDate]); //get background url 

		//DISPLAY DATA TO HTML
	      $("#temp").html(tempC + "&deg;C");
              $("#weather").html(weather);
              icon_id += "-" + day;
              $("#icon").html("<i class=\'owf owf-" + icon_id + "\'></i>");
              $("#location").html(location);
              $('body').css('background-image', 'url(' + background + ')');

	      //Toggle between farenheit and celcius
	      $("#temp").click(function() {
		    var html = $(this).text().match(/\d*/);
		    var type = $(this).text();
		    type = type[type.length-1];
		    if (type == "C") {
		        html = window.tempF;
                        console.log(html);
			$("#temp").html(window.tempF +  "&deg;F");
		    }
		    else {
		       $("#temp").html(window.tempC +  "&deg;C");
		    }
		}); //end of toggle
            }); //end of getJSON
	console.log(weather_link);

        }); //end of navigator
  }

});

