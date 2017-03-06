var quotes  = [
  {
    "id"    : 1,
    "quote" : "Social progress can be measured by the social position of the female sex.",
    "author": "Karl Marx"
  }, 
  {
    "id"    : 2,
    "quote" : "The production of too many useful things results in too many useless people.",
    "author": "Karl Marx"
  }, 
  {
    "id"    : 3,
    "quote" : "Democracy is the road to socialism.",
    "author": "Karl Marx"
  }, 
  {
    "id"    : 4,
    "quote" : "The journey of a thousand miles begins with one step.",
    "author": "Lao Tzu"
  }, 
  {
    "id"    : 5,
    "quote" : "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    "author": "Lao Tzu"
  }, 
  {
    "id"    : 6,
    "quote" : "Education without values, as useful as it is, seems rather to make man a more clever devil.",
    "author": "C.S Lewis"
  }, 
  {
    "id"    : 7,
    "quote" : "No one ever told me that grief felt so like fear.",
    "author": "C.S Lewis"
  }, 
  {
    "id"    : 8,
    "quote" : "Christianity, if false, is of no importance, and if true, of infinite importance. The only thing it cannot be is moderately important.",
    "author": "C.S Lewis"
  }, 
  {
    "id"    : 9,
    "quote" : "Everyone has noticed how hard it is to turn our thoughts to God when everything is going well with us... While what we call 'our own life' remains agreeable, we will not surrender it to Him. What, then, can God do in our interests but make 'our own life' less agreeable to us, and take away the plausible sources of false happiness?",
    "author": "C.S Lewis"
  }, 
  {
    "id"    : 10,
    "quote" : "If you know the enemy and know yourself you need not fear the results of a hundred battles.",
    "author": "Sun Tzu"
  }, 
  {
    "id"    : 11,
    "quote" : "Know thy self, know thy enemy. A thousand battles, a thousand victories.",
    "author": "Sun Tzu"
  }, 
  {
    "id"    : 12,
    "quote" : "The supreme art of war is to subdue the enemy without fighting.",
    "author": "Sun Tzu"
  }, 
  {
    "id"    : 13,
    "quote" : "Regard your soldiers as your children, and they will follow you into the deepest valleys; look on them as your own beloved sons, and they will stand by you even unto death.",
    "author": "Sun Tzu"
  }, 
  {
    "id"    : 14,
    "quote" : "To know, is to know that you know nothing. That is the meaning of true knowledge.",
    "author": "Socrates"
  }, 
  {
    "id"    : 15,
    "quote" : "Wisdom begins in wonder.",
    "author": "Socrates"
  }, 
  {
    "id"    : 16,
    "quote" : "Imagination will often carry us to worlds that never were. But without it we go nowhere.",
    "author": "Carl Sagan"
  }, 
  {
    "id"    : 17,
    "quote" : "The universe is not required to be in perfect harmony with human ambition.",
    "author": "Carl Sagan"
  }, 
  {
    "id"    : 18,
    "quote" : "People sleep peaceably in their beds at night only because rough men stand ready to do violence on their behalf.",
    "author": "George Orwell"
  }, 
  {
    "id"    : 19,
    "quote" : "Astronomy compels the soul to look upwards and leads us from this world to another.",
    "author": "Plato"
  }, 
  {
    "id"    : 20,
    "quote" : "To be a Christian without prayer is no more possible than to be alive without breathing.",
    "author": "Martin Luther"
  }
];

var colors = ["#ff8533", "#ff6666", "#809fff", "#66ff66", "#ff66a3", "#ffff66"];



$(document).ready(function() {
    var html = "<i class='fa fa-quote-left' aria-hidden='true'></i>";
    html += quotes[0]["quote"];
    html += "<i class='fa fa-quote-right' areia-hidden='true'></i>";
    var author = "&#45; " + quotes[0]["author"];
    author += "&emsp;<a class='fa fa-twitter twitter-share-button'";
    var text = "&ldquo;" + quotes[0]["quote"].replace(" ", "%20") + "&rdquo;";
    text += " &ndash; " + quotes[0]["author"];
    text += "\n\r  more @ https://juhongkim.tk/FreeCodeCampAssignments/randomQuoteGenerator/";
    author += "href='https://twitter.com/intent/tweet?text=" + text + "'>";
    author += " Tweet</a>";

    $(".fa").css("color", colors[0]);
    $('body, html').css("background-color", colors[0]);
    $(".quote").html(html);
    $(".author").html(author);
    $("body").css("color", colors[0]);
    $(".quote").html(html);
    $(".author").html(author);
    $("body").css("color", colors[0]);
    $("button").css("background-color", colors[0]);

    $("#getQuote").click(function() {
        var randomID = Math.floor(Math.random() * 20 + 1);
        var colorID = Math.floor(Math.random() * 5);
        var html = "<i class='fa fa-quote-left' aria-hidden='true'></i>";
        html += quotes[randomID]["quote"];
        html += "<i class='fa fa-quote-right' areia-hidden='true'></i>";
        var author = "&#45; " + quotes[randomID]["author"];
        author += "&emsp;<a class='fa fa-twitter twitter-share-button'";
        var text = "&ldquo;" + quotes[randomID]["quote"].replace(" ", "%20") + "&rdquo;";
        text += " &ndash; " + quotes[randomID]["author"];
        text += "\n\r  more @ https://juhongkim.tk/FreeCodeCampAssignments/randomQuoteGenerator/";
        author += "href='https://twitter.com/intent/tweet?text=" + text + "'>";
        author += " Tweet</a>";
        $(".fa").css("color", colors[colorID]);
        $('body, html').css("background-color", colors[colorID]);
        $(".quote").html(html);
        $(".author").html(author);
        $("body").css("color", colors[colorID]);
        $(".quote").html(html);
        $(".author").html(author);
        $("body").css("color", colors[colorID]);
        $("button").css("background-color", colors[colorID]);
    });
});
