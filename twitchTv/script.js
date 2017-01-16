function active(target, curr) {
  $(target).css("background-color", "#ca90fa");
  $(target).addClass("focus");
  console.log("test"); 
  $(curr).css("background-color", "#787878");
  $(curr).removeClass("focus");
  window.curr = target;
}

$(document).ready(function(){
  var all = document.getElementById("all");
  var online = document.getElementById("online");
  var offline = document.getElementById("offline");  
  
  var curr;
  $(all).ready(function() {active(all, window.curr);});
  $(all).click(function() {if (all != window.curr) {active(all, window.curr);}});
  $(online).click(function() {if (online != window.curr) { active(online, window.curr);}});
  $(offline).click(function() {if (offline != window.curr){ active(offline, window.curr);}});
   
});

