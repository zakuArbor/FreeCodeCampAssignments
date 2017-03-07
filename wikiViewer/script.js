$(document).ready(function() {
    $(document.getElementById("search_icon")).click(function() { search(); });
    $(document.getElementById("search_input")).keyup(function(e) {
        if (e.keyCode == 13) {
            search();
        }
    });

    function search() {
        var search = document.getElementById("search_input").value;
        var url = "https://en.wikipedia.org/w/api.php?format=json&action=";
        url += "query&generator=search&gsrnamespace=0&gsrsearch=";
        url += search + "&gsrlimit=10&prop=extracts&pilimit=max&";
        url += "exintro&explaintext&exsentences=1&exlimit=max";
        url += "&callback=?";
        $.getJSON(url, function(json) {
            var result_html = "";
            $(document.getElementById("search_box")).css("top", 0);
            for (var key in json["query"]["pages"]) {
                var page_url = "https://en.wikipedia.org/?curid=";
                page_url += key;
                var title = json["query"]["pages"][key]["title"];
                var content = json["query"]["pages"][key]["extract"];
                console.log(title);
                result_html += "<div id = 'result'>";
                result_html += "<a href = " + page_url + ">";
                result_html += "<h3 id = 'result_title' class='bg-primary'>";
                result_html += title + "</h3>";
                result_html += "<div id = 'result_content'>";
                result_html += content + "</div>";
                result_html += "</a></div>";
            }
            $(document.getElementById("results")).html(result_html);
            console.log(result_html);
        });
    } //);
});
