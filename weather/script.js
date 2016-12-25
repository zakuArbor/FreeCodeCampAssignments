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
    timeH_max +=1
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

function getBackground (time) {
  /*
  PROBLEMS TO FIX: 
  -Does not take into consideration that sunset can come after 8
     ex.) current time is 8:00 so it's night
          sunset is at 8:30 so not within time range so night appears
  -similar with sunrise
  */

  var background_url;
  var current_hour = time[0].getHours(); //current hour
  var current_min = time[0].getMinutes(); //current minutes
  var sunset = time[2];
  var sunrise = time[1];
  var month = time[0].getMonth();


  //current time night or day
  if (current_hour >= 6 && current_hour < 20) { //day
    night = false;
  }
  else { //night
    night = true;
  }

  var sunrise = withinTimeRange(current_hour, current_min, sunrise);
  var sunset  = withinTimeRange(current_hour, current_min, sunset);


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

function getInfo() {
 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var weather_link = "http://api.openweathermap.org/data/2.5/weather";
            weather_link += "?lat=" + position.coords.latitude;
            weather_link += "&lon=" + position.coords.longitude;
            weather_link += "&APPID=b5fa033436df259e1fe280df8a10aff6";
            $.getJSON(weather_link, function(json) {
                console.log(json);
                var location = json["name"] + ", " + json["sys"]["country"];
                var weather = json["weather"][0]["main"];
                var temp = json["main"]["temp"] -273.15; //calvin -273.15 = Celcius
                var icon_id = json["weather"][0]["id"];

                var date = new Date();
                var hour = date.getHours();

                var day = '';
                if (hour >=6 && hour <= 20) {
                  day = 'd';
                }
                else {
                  day = 'n';
                }

                $("#temp").html(temp + "&deg;C");
                $("#weather").html(weather);
                icon_id += "-" + day;
                $("#icon").html("<i class=\'owf owf-" + icon_id + "\'></i>");
                $("#location").html(location);
          //sunset and sunrise time are given at UTC time
                var riseDate = new Date(json["sys"]["sunrise"]*1000); 
                var setDate = new Date(json["sys"]["sunset"]*1000);

                var background = getBackground(
                        [date,riseDate, setDate]);
                $('body').css('background-image', 'url("' + background + '")');
                console.log("pika test");
                $("#temp").toggle(
			function(temp) {
			    $("#temp").html(celciusToFarenheit(temp) +  "&deg;C"); 
			},
                        function(temp) {
                            $("#temp").html(temp +  "&deg;C"); 
                        }
		);
                

                });
    

            });
        });
    }

}

$(document).ready(function () {
  getInfo();
});
