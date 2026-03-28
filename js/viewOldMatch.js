var isLocked = false;
var matchNum = 0;
var initialTime = 140;
var redInputValues = [
	'red1',
	'red2',
	'red3',
	"red_mob",

	"red_auto_gp1_high",
	"red_auto_gp1_low",
	"red_auto_gp2_high",
	"red_auto_gp2_low",

	"red_tele_gp1_high",
	"red_tele_gp1_low",
	"red_tele_gp2_high",
	"red_tele_gp2_low",

	"red_park",
	"red_climb",
	"red_foul",
	"red_tech_foul",
	// "red_ranking_point"
]

var blueInputValue = [
	'blue1',
	'blue2',
	'blue3',
	"blue_mob",

	"blue_auto_gp1_high",
	"blue_auto_gp1_low",
	"blue_auto_gp2_high",
	"blue_auto_gp2_low",

	"blue_tele_gp1_high",
	"blue_tele_gp1_low",
	"blue_tele_gp2_high",
	"blue_tele_gp2_low",

	"blue_park",
	"blue_climb",
	"blue_foul",
	"blue_tech_foul",
	// "blue_ranking_point"
]


function post(path, params) {
	console.log("posting: " + JSON.stringify(params));

	$.ajax({
		url: path,
		data: params,
		type: 'POST',
		success: function (data) { console.log(data); }
	});
}

$('#matchSet').click(function () {
	$.ajax({
		url: './php/getMatch.php',
		type: 'POST',
		data: { match_num: document.getElementById('match').value },
		success: function (data) {
			console.log("submit log1 ", data);
			setAllianceInfo(data);
		}
	});
});

function setAllianceInfo(data) {
	var info = $.parseJSON(data)[0];
	console.log(info);
	
	matchNum = parseInt(info["match_num"]);
	document.getElementById('matchNum').innerText = "Match: " + matchNum;
	//code to set text boxes with the values
	for (var prop in info) {
		$('#' + prop).val(info[prop]);
	}						

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$('#submit').click(function () {

	//gets the match number from the screen which is in the format Match: Match #
	var match_num = document.getElementById("matchNum").innerText;
	//will spilt the string and just get the number; 
	match_num = match_num.split(': ')[1];
	 var data = { "match_num": match_num };

	 //will get all the values from the fields listed above and add them to the data object 
	 //to get passed into the put request
	for(let val in redInputValues) {
		var key = redInputValues[val];
		var fieldValue = document.getElementById(key).value;
		data[key] = fieldValue;
		console.log("key: " + key+ " value: " + fieldValue);
	}

	for(let val in blueInputValue) {
		var key = blueInputValue[val];
		var fieldValue = document.getElementById(key).value;
		data[key] = fieldValue;
		console.log("key: " + key+ " value: " + fieldValue);
	}

	console.log(data);

    $.ajax({
        url: './php/updateMatch.php',
        data: data,
        type: 'POST',
        success: function (data) {
			console.log(JSON.stringify(data));
        }
    });
});


//loads when the page gets sets
$(document).ready(function () {
	//set interval causes a function to run every given miliseconds (in this case 500)
	//this is a jQuery function to send a HTTP request
	const match_num = params.get('match_num'); 

	$.ajax({
		url: './php/getMatch.php',
		type: 'POST',
		data: { match_num: match_num },
		success: function (data) {
			setAllianceInfo(data);
		}
	});	

});
