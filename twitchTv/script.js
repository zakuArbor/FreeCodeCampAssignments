function active(target, curr) {
  $(target).css("background-color", "#ca90fa");
  $(target).addClass("focus");
  console.log("test"); 
  $(curr).css("background-color", "#787878");
  $(curr).removeClass("focus");
  window.curr = target;
}

function loadContent() {
  
}

function displayChannel(channel, index) {
  var url = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?";
  $.getJSON(url, function(data){
    var channel_url;
    var logo;
    var status;
    console.log(channel);
    if(data.stream) {
      channel_url = data.stream.channel["url"];
      logo = data.stream.channel.logo;
      status = data.stream.channel.status;
    }
    else { //offline
      status = offline;
      url = "https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?";
      $.getJSON(url, function(data) {
	logo = data.logo;
        channel_url = data.url;
      });
    }
  });
}

function getChannelInfo() {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  streamers.forEach(displayChannel);   
}

$(document).ready(function(){
  var all = document.getElementById("all");
  var online = document.getElementById("online");
  var offline = document.getElementById("offline");  
  getChannelInfo();  
  var curr;
  $(all).ready(function() {active(all, window.curr); loadContent();});
  $(all).click(function() {if (all != window.curr) {active(all, window.curr);}});
  $(online).click(function() {if (online != window.curr) { active(online, window.curr);}});
  $(offline).click(function() {if (offline != window.curr){ active(offline, window.curr);}});
   
});

