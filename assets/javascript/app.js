$(document).ready(function() {

var animals = ["cats", "dogs", "birds", "bunnies", "monkeys"];
var animal = '';
var offset = 0;

$("#addButton").hide();

//displays 10 gifs when an animal button is clicked
function displayAnimalGifs() {
    $("#gifs-view").empty();
    animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=lykChudJ7T8d9ubNOq98NPu4pJSOy136&limit=10";
    offset = 10;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
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
                animalImage.attr("class", "gif img-thumbnail");

                animalDiv.append(p);
                animalDiv.append(animalImage);
                animalDiv.attr("class", "gifDiv");

                $("#gifs-view").prepend(animalDiv);
                $("#addButton").show();

            }
        );

    });
    
};


//adds an additional 10 gifs to the page when the add more button is clicked
$("#addMore").on("click", function() {
    var queryURL2 = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=lykChudJ7T8d9ubNOq98NPu4pJSOy136&limit=10&offset=" + offset + "";

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results2 = response.data;

        results2.forEach(
            function(result) {
                var animalDiv = $("<div>");

                var p = $("<p>");
                p.text("Rating: " + result.rating.toUpperCase());

                var animalImage = $("<img>");
                animalImage.attr("src", result.images.fixed_height_still.url);
                animalImage.attr("data-still", result.images.fixed_height_still.url);
                animalImage.attr("data-animate", result.images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.attr("class", "gif img-thumbnail");

                animalDiv.append(p);
                animalDiv.append(animalImage);
                animalDiv.attr("class", "gifDiv");

                $("#gifs-view").append(animalDiv);
                $("#addButton").show();
                offset += 10;

            }
        );
        
    });

})

//animates the still gifs when they are clicked, or pauses animated gifs
$(document.body).on("click", ".gif", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});


//renders the animal buttons on the page
function renderButtons() {
    $("#buttons-view").empty();

    for (i in animals) {
        var a = $("<button>");
        a.addClass("btn btn-primary animal");
        a.attr("type", "button");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
};

//adds animal from input form onto the animals array and renders the new buttons
$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    
    renderButtons();
});

//runs the function to display the first 10 gifs when an animal button is clicked
$(document).on("click", ".animal", displayAnimalGifs);


//renders the buttons on page load
renderButtons();

});