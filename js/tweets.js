var username = "Wkamovitch";
var recentTweetsUrl = "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=true&screen_name=" + username + "&count=2&callback=?";
var followerCountUrl = "http://api.twitter.com/1/users/show.json?screen_name=" + username + "&callback=?";


$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: recentTweetsUrl,
        dataType: "jsonp",
        success: function (response) {
            var tdata = '';
            for (i = 0; i < response.length; i++) {
                data = response[i];
                var id = data.id;
                var text = data.text;
                var created_time = data.created_at;
                var screen_name = data.user.screen_name;
                var image = data.user.profile_image_url;
                var source = data.source;
                var titletext = "<div class='twittertitle'><a href='https://twitter.com/wkamovitch'>@WKamovitch</a></div><ul class='twitter'>";

                tdata += "<li id='txt'>" + text + "</li>";
            }
            var tweeted = '';
            tweeted = titletext + tdata + "</ul>";

            $(tweeted).appendTo('#tweets');
        }
    });
});