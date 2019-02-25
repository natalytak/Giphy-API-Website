$(document).ready(function () {

    var holidays = ["Happy New Year", "Happy Halloween", "Thanksgiving", "Merry Christmas", "Happy Easter", "Mother's Day", "Father's Day", "July 4th", "Happy Birthday", "Happy Anniversary", "I love you", "Miss you", "Get well", "Thank you"];
    var results;
    var holidayDiv;
    var gifImage;
    var rating;
    // var gifMovingImage;

function getInfo() {

    var holiday = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + holiday + "&api_key=IHxamnsXypY3W7r5a34YFktGVcRJwq35&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        $(".gifs-here").empty();
        console.log(response);
        var results = response.data;

    for (var i = 0; i < results.length; i++) {

      if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
        var rating = results[i].rating;
        var imageStillURL = results[i].images.fixed_height_still.url;
        var imageMoveURL = results[i].images.fixed_height.url;
        var holidayDiv = $('<div>');
        var rating = $('<p>').html("Rating: " + rating);
        var gifImage = $('<img>').attr('class', 'image').attr('src', imageStillURL);
        
  
          holidayDiv.append(gifImage);
          holidayDiv.append(rating);
          $('.gifs-here').prepend(holidayDiv);
          
          $('body').on('click', '.image', function() {
            var source = $(this).attr('src');
            if($(this).hasClass('moving')) {
              $(this).removeAttr
              $(this).attr('src', source.replace(/\.gif/i, "_s.gif"))
              $(this).removeClass('moving');
            } else {
            $(this).addClass('moving');
            $(this).attr('src', source.replace(/\_s.gif/i, ".gif"))
            }
          })
        }
      }
    })
  }

    function makeButtons() {
        $("#buttons").empty();
        
        for (var i = 0; i < holidays.length; i++) {
          var arrayBtn = $("<button>").addClass("holidayClass").attr("data-name", holidays[i]).text(holidays[i]);
          
          $("#buttons").append(arrayBtn);
        }
      }

      $("#add-holiday").on("click", function(event) {
        event.preventDefault();
        var holiday = $("#holiday-input").val().trim();
        holidays.push(holiday);
        $('#holiday-input').val('');
        makeButtons();
      });

      $(document).on("click", ".holidayClass", getInfo);
        makeButtons();
     
});