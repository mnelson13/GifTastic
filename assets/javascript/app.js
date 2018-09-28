$(document).ready(function() {

var animals = ["cats", "dogs", "birds"];



function displayAnimalGifs() {
    $("#gifs-view").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=lykChudJ7T8d9ubNOq98NPu4pJSOy136&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;

        results.forEach(
            function(result) {
                var animalDiv = $("<div>");

                var p = $("<p>");
                p.text("Rating: " + result.rating.toUpperCase());

                var animalImage = $("<img>");
                animalImage.attr("src", result.images.fixed_height_still.url);
                animalImage.attr("data-still", result.images.fixed_height_still.url);
                animalImage.attr("data-animate", result.images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif");

                animalDiv.append(p);
                animalDiv.append(animalImage);
                animalDiv.attr("class", "gifDiv");

                $("#gifs-view").prepend(animalDiv);

            }
        );

        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }


        });

    });

};



function renderButtons() {
    $("#buttons-view").empty();

    for (i in animals) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
};


$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    
    renderButtons();
});

$(document).on("click", ".animal", displayAnimalGifs);

renderButtons();

});