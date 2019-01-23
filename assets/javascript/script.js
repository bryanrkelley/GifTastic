$(document).ready(() => {

    $('#userInput').on('click', function () {
        $('#userInput').val('');
    });

    $('#userButton').on('click', function (event) {
        event.preventDefault();

        var newButton = $('#userInput').val().trim();
        console.log("new button: " + newButton);

        $('#userInput').val('');

        $('#buttons').append('<button class="buttons" data-animal="' + newButton + '">' + newButton + '</button>')
    });

    $(document).on("click", "button", function () {
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=TcF1VsGduKCmO6F9l9ODolJkfJtqlqJi&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animalImage = $("<img>");
                console.log(results[i]);
                animalImage.attr("src", results[i].images.fixed_height.url);

                animalDiv.prepend(p);
                animalDiv.prepend(animalImage);

                $("#gifs-appear-here").prepend(animalDiv);

            }
        });
    });
});