function active(target, curr) {
  $(target).css("background-color", "#ca90fa");
  $(target).addClass("focus");
  console.log("test"); 
  $(curr).css("background-color", "#787878");
  $(curr).removeClass("focus");
  window.curr = target;
}

function displayChannel(channel, channel_box) {
  var url = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?";
  var html; 
  $.getJSON(url, function(data){
    var channel_url;
    var logo;
    var status;
    var state;
    if(data.stream) {
      state = "online";
      channel_url = data.stream.channel["url"];
      logo = data.stream.channel.logo;
      status = data.stream.channel.status;
    }
    else { //offline
      state = "offline";
      status = "offline";
      url = "https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?";
      $.getJSON(url, function(data) {
	logo = data.logo;
        channel_url = data.url;
        console.log(data);
      });
    }
    if (logo == undefined) {
      logo = "";
    }
    console.log(logo);
    var html = "<div class = 'status_box ";
    html += state + "'>";
    html += "<img class = 'logo' src = '";
    html += logo + "'>"; 
    html += "</div><div class = 'status_content'>";
    html += "<div class = 'name'>" + channel;
    html += "</div><div class = 'status'>" + status  + "</div></div>";
    $(channel_box).append(html);
  });
}

function getChannelInfo() {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var channel_box = document.getElementById("status");
  console.log(channel_box);
  var html = "";
  for (i = 0; i < streamers.length; i++) {
    displayChannel(streamers[i], channel_box);
  }
}

$(document).ready(function(){
  var all = document.getElementById("all");
  var online = document.getElementById("online");
  var offline = document.getElementById("offline");
  getChannelInfo();
  var curr;
  $(all).ready(function() {active(all, window.curr);});
  $(all).click(function() {if (all != window.curr) {active(all, window.curr);}});
  $(online).click(function() {if (online != window.curr) { active(online, window.curr);}});
  $(offline).click(function() {if (offline != window.curr){ active(offline, window.curr);}});
   
});

