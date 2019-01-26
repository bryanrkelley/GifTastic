$(document).ready(() => {

    //var $animalButtons = $('#animalButtons');


    $('#userInput').on('click', function () {
        $('#userInput').val('');
    });

    $('#userButton').on('click', function (event) {
        event.preventDefault();

        var newButton = $('#userInput').val().trim();
        console.log("new button: " + newButton);

        $('#userInput').val('');

        $('#animalButtons').append('<button class="buttons" data-animal="' + newButton + '">' + newButton + '</button>')
    });

    //Want to make it so hitting enter will cause submission too

    // $('#userButton').keyup(function (event) {
    //     if (event.keyCode === 13) {

    //         var newButton = $('#userInput').val().trim();
    //         console.log("new button: " + newButton);

    //         $('#userInput').val('');

    //         $('#animalButtons').append('<button class="buttons" data-animal="' + newButton + '">' + newButton + '</button>')
    //     }
    // });

    $('#animalButtons').on('click', 'button', function () {
        console.log('buttons');
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
                animalImage.attr("data-still", results[i].images.fixed_height.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);

                animalImage.addClass("gif");
                animalImage.attr("data-state", "still");

                animalDiv.prepend(p);
                animalDiv.prepend(animalImage);

                $("#gifs-appear-here").prepend(animalDiv);

            }
        });
    });


    //Pause functionality.  Not working
    $(document).on("click", ".gif", function () {
        var state = $(this).attr('data-state');

        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');

        }

    });

});