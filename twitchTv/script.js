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
  $(all).click(function() {active(all, window.curr);});
  $(online).click(function() {active(online, window.curr);});
  $(offline).click(function() {active(offline, window.curr);});
   
});

