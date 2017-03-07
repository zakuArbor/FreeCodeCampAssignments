function changeView(state) {
    if (state == "all") {
        $(".online").removeClass("hide");
        $(".offline").removeClass("hide");
    } else if (state == "online") {
        $(".online").removeClass("hide");
        $(".offline").addClass("hide");
    } else {
        $(".online").addClass("hide");
        $(".offline").removeClass("hide");
    }
}

function active(target, curr, state) {
    $(target).css("background-color", "#ca90fa");
    $(target).addClass("focus");
    console.log(status);
    changeView(state);
    $(curr).css("background-color", "#787878");
    $(curr).removeClass("focus");
    window.curr = target;
}

function generateHTML(channel_box, logo, channel, channel_url, status, state, game) {
    if (status != "DNE") {
        var html = "<div class = 'status_box " + state + "'><a href = " + channel_url + ">";
        html     += "<img class = 'logo' src =" + logo + ">";
        html     += "<div class =  'status_content'>";
        html     += "<div class = 'name col-sm-4'>" + channel + "</div>";

        if (game == null) {
            html += "<div class = 'status col-sm-8'>" + status + "</div></div>";
        } else {
            html += "<div class = 'status col-sm-8'>" + game;
            html += "<span class = 'info'>: " + status + "</span></div></div>";
        }
    } else {
        var html = "<div class = 'dne status_box " + state + "'>";
        html     += "<div class =  'dne_message'>";
        html     += "<div class = 'status'>" + game + "</div></div>";
    }
    $(channel_box).append(html);
}

function displayChannel(channel, channel_box) {
    var url = "https://wind-bow.gomix.me/twitch-api/streams/" + channel + "?callback=?";
    var html;
    $.getJSON(url, function(data) {
        var channel_url;
        var logo;
        var status;
        var state;
        var game
        if (data.stream) {
            state       = "online";
            channel_url = data.stream.channel["url"];
            logo        = data.stream.channel.logo;
            status      = data.stream.channel.status;
            game        = data.stream.channel.game;
            generateHTML(channel_box, logo, channel, channel_url, status, state, game);
        } else { //offline
            state  = "offline";
            status = "offline";
            game   = null;
            url    = "https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?";
            $.getJSON(url, function(data) {
                if (data.status != 404) {
                    logo = data.logo;
                    channel_url = data.url;
                } else {
                    channel_url = "#";
                    status      = "DNE"
                    game        = data.message;
                }
                generateHTML(channel_box, logo, channel, channel_url, status, state, game);
            });
        }
    });
}

function getChannelInfo() {
    var streamers   = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
    var channel_box = document.getElementById("status");
    for (i = 0; i < streamers.length; i++) {
        displayChannel(streamers[i], channel_box);
    }
}

$(document).ready(function() {
    var all = document.getElementById("all");
    var online = document.getElementById("online");
    var offline = document.getElementById("offline");
    getChannelInfo();
    var curr;
    $(all).ready(function() { active(all, window.curr); });
    $(all).click(function() {
        if (all != window.curr) { active(all, window.curr, "all"); } 
    });
    $(online).click(function() {
        if (online != window.curr) { active(online, window.curr, "online"); } 
    });
    $(offline).click(function() {
        if (offline != window.curr) { active(offline, window.curr, "offline"); } 
    });

});
