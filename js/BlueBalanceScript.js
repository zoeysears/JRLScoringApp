//var endGame = new Audio('./sounds/4_match_endgame.wav');
//endGame.play();

//This function updates the time display given the time as an int
function updateTime(newTime) {
    var min = Math.floor(newTime / 60).toString();
    var sec = newTime % 60;
    if (sec < 10) {
        sec = "0" + sec.toString();
    } else {
        sec = sec.toString();
    }
    var display = min + ":" + sec;
    $("#time").html(display);
}

//this runs when the page has loaded
$(document).ready(function () {

    //set interval causes a function to run every given miliseconds (in this case 500)
    setInterval(function () {
       // calcScore();

        //this is a jQuery function to send a HTTP request
        $.ajax({
            //give the url to go to (the .. means go up a folder)
            url: './php/GetStatus.php',

            //this says what todo as soon as all the data has been loaded
            success: function (data) {
                //console.log(data); //print out the data
                console.log(data);
                //convert the JSON string to a JavaScript object (also called a key:value array)
                var info = $.parseJSON(data);

				$("#water_count").html(info["water_count"]);
                $("#earth_count").html(info["earth_count"]);
				

            }
        });

    }, 250);
});
