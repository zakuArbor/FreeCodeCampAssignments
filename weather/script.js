console.log("test");
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


function getBackground (time, mobile) {
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
  
  if (!mobile) {
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
  }
  else { //mobile
    if (night %% !sunset) {//night
      background_url = "070B3D";
    }
    else if (sunset || sunrise) { //sunset or sunrise
      background_url = "E03F3F";
    }
    else { //day
      background_url = "#79b9e1";
    }
  }
  return background_url;
}

var test = "hello";
var tempC;
var tempF;

$(document).ready(function () {
//  if (navigator.geolocation) {
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
              
              var isMobile = false; //initiate as false
              // device detection
              if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
              var background = getBackground([date,riseDate, setDate], isMobile); //get background url 
	      
              $("#loading").html("");
              $("#loading").removeAttr('style');

	      //DISPLAY DATA TO HTML
	      $("#temp").html(tempC + "&deg;C");
              $("#weather").html(weather);
              icon_id += "-" + day;
              $("#icon").html("<i class=\'owf owf-" + icon_id + "\'></i>");
              $("#location").html(location);
              if (mobile) {
                $('body').css('background-color', background);
              }
              else {
                $('body').css('background-image', 'url(' + background + ')');
              }
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
	},
  	function(failure) {
	    if(failure.message.indexOf("Only secure origins are allowed") == 0) {
      		// Secure Origin issue.
                alert("Sorry, Chrome 50+ does not support geolocation from http");
    	    }
        }); //end of navigator
  	
});



