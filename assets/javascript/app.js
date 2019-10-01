$(document).ready(function () {
    // starting topics
    var topics = ["Spock", "Picard", "Star Trek", " USS Enterprise", "Tricorder"];
    var newButton = "";
    var apiKey = "j3zsQ0KbC94N8z7C8zDNqOZ4dNyKgz5L";
    var topic;
    // var queryURL = "https://api.giphy.com/v1/gifs/translate?api_key="+apiKey+"&s="+topic;
    

function createBtn () {
    for(var i = 0; i < topics.length; i++){
        
        $('<button>')
            .attr('id', topics[i])
            .text(topics[i])
            .addClass("buttons gifBtn btn btn-light")
            .appendTo('#buttonsHere');
    };
}
    
    $("#submitBtn").on("click", function () {
        $("#buttonsHere").empty();
        newButton = $("#newTopic").val();
        if (newButton == "") {
            return false;
        }
        $("#newTopic").val('');
        topics.push(newButton);
        createBtn()
    })

    $(document).on("click", ".gifBtn", function () {
         
        topic = $(this).text().trim();
        console.log(topic);
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key="+apiKey+"&limit=10";
         console.log(queryURL);
         
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (response) {
                 console.log(response);
            var results = response.data;
            console.log(results);
         
            for (let i = 0; i < results.length; i++) {
                
                var gifDiv = $("<div>");
                gifDiv.addClass("gifsHere")
                var gifImage = $("<img>");
                
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifArea").prepend(gifDiv);
            var rating = $("<p>")
                rating.html(results[i].rating); // rating propety of the retrieved api response
                rating.addClass("rating");
                console.log(rating);
                gifDiv.append(rating);
                $(gifDiv).append("<br>");
            }
            });
            // animates the still GIFs, pauses animated GIFs
            $(document).on("click", ".image", function(){
                var state = $(this).attr('data-state');
                if ( state == 'still'){
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
    });




})
createBtn()
})