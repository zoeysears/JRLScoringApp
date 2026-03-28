var isLocked = false;
var matchNum = 0;
var initialTime = 140;

function post(path, params) {

	console.log("posting: " + JSON.stringify(params));

	$.ajax({
		url: path,
		data: params,
		type: 'POST',
		success: function (data) { console.log(data); }
	});
}

$('#lockbtn').click(function () {
	shiftLastPress(this);
	changeLockBtn(!isLocked);
});

var lastPressed = [];

function shiftLastPress(newPress){
	if(lastPressed[2]) lastPressed[2].style.backgroundColor = "lightgray";
	if(lastPressed[1]){
		lastPressed[2] = lastPressed[1];
		lastPressed[2].style.backgroundColor = "yellow";
	}
	if(lastPressed[0]){
		lastPressed[1] = lastPressed[0];
		lastPressed[1].style.backgroundColor = "greenyellow";
	}
	lastPressed[0] = newPress;
	lastPressed[0].style.backgroundColor = "lightgreen";
}

changeLockBtn = function (locked) {
	post('./php/updateStatus.php', { score_lock: (locked ? 1 : 0) });
	// post('./php/sendScore.php', { score_lock: (locked ? 1 : 0) });
	//console.log(JSON.stringify({lock_score: (locked?1:0)}));
	isLocked = locked;
	if (isLocked) {
		document.getElementById('lockbtn').value = 'Unlock';
	} else {
		document.getElementById('lockbtn').value = 'Lock';
	}
}

$('#clearData').click(function () {
	shiftLastPress(this);
	clearTeamData();
});

$('#updateTeamRanks').click(function () {
	shiftLastPress(this);
	updateTeamRanks();
});

$('#matchSet').click(function () {
	shiftLastPress(this);
	$.ajax({
		url: './php/updateStatus.php',
		type: 'POST',
		data: { match_num: document.getElementById('match').value },
		success: function (data) {
			console.log("submit log1 ", data);
			$.ajax({
				url: './php/GetCurrentMatch.php', success: function (data) {
					var info = $.parseJSON(data);
					console.log("submit log2 ", data);
					post('./php/updateStatus.php',
						{
							red_score: 0,
							blue_score: 0,
							match_time: initialTime,
							blue1: info[0]['blue1'],
							blue2: info[0]['blue2'],
							blue3: info[0]['blue3'],
							red1: info[0]['red1'],
							red2: info[0]['red2'],
							red3: info[0]['red3']
						}
					);
				}
			});
		}
	});
});


$('#nextMatch').click(function () {
	shiftLastPress(this);
	$.ajax({
		url: './php/updateStatus.php',
		data: { match_num: matchNum + 1 },
		type: 'POST',
		success: function (data) {
			$.ajax({
				url: './php/GetCurrentMatch.php', success: function (data) {
					var info = $.parseJSON(data);
					post('./php/updateStatus.php', {
						red_score: 0,
						blue_score: 0,
						match_time: initialTime,
						blue1: info[0]['blue1'],
						blue2: info[0]['blue2'],
						blue3: info[0]['blue3'],
						red1: info[0]['red1'],
						red2: info[0]['red2'],
						red3: info[0]['red3']
					});
				}
			});
		}
	});
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$('#submit').click(function () {
	shiftLastPress(this);
	var status = {};
	$.ajax({
		url: './php/getStatus.php', 
		success: function (data) {
			status = $.parseJSON(data);
			var waiting = true;
			var info = {};
			$(".red1 input, .blue1 input, .red2 input, .blue2 input").each(function () {
				//console.log(this.id, this.value);
				if (!(this.id == "red_confirm" || this.id == "blue_confirm")) {
					info[this.id] = this.value;
				}
			});
			info["match_num"] = matchNum;
			console.log(info);
			$.ajax({
				url: './php/postFinalScore.php', type: 'POST',
				data: info,
				success: function (data) {
					console.log(data);
					waiting = false;
					
					
					//update teams from match
					if (parseInt(status["match_num"]) < 200) {
						updateTeamsInMatch(parseInt(status['match_num']));
					}
				}
			});
			
			
			
			

		}
	});
	changeLockBtn(false);
});

//this runs when the page has loaded
$(document).ready(function () {
	//set interval causes a function to run every given miliseconds (in this case 500)
	setInterval(function () {
		//this is a jQuery function to send a HTTP request
		$.ajax(
			{
				//give the url to go to (the .. means go up a folder)
				url: './php/GetCurrentMatch.php',

				//this says what todo as soon as all the data has been loaded
				success: function (data) {
					try {
						var info = $.parseJSON(data)[0];

						//console.log(info[0]['station'])

						//console.log('red1:'+red1_info['team_num']+'red2:'+red2_info['team_num']+'blue1:'+blue1_info['team_num']+'blue2'+blue2_info['team_num']+'\n');

						/*var red1_team = document.getElementById('red1_team');
						var red2_team = document.getElementById('red2_team');
						var blue1_team = document.getElementById('blue1_team');
						var blue2_team = document.getElementById('blue2_team');*/

						matchNum = parseInt(info['match_num']);
						document.getElementById('matchNum').innerText = "Match: " + info['match_num'];


						if (!isLocked) {
							for (var prop in info) {
								$('#' + prop).val(info[prop]);
							}
							

						}
					} catch (e) {
						console.log("Error in data: "+data);
					}
					//console.log(data); //print out the data

					//convert the JSON string to a JavaScript object (also called a key:value array)
					

					//every value in the JavaScript object is a string so it must be converted to an int
					//updateTime(parseInt(info['match_time']));

				}
			});
			
		$.ajax({
			url: './php/getStatus.php', success: function (data) {
				var info = $.parseJSON(data);
				document.getElementById("red_confirm").checked = info["red_confirm"] == '1';
				document.getElementById("blue_confirm").checked = info["blue_confirm"] == '1';
			}
		});
		
		
	}, 500);
});

function setScreen(val) {
	$.ajax({
		url: "./php/updateStatus.php",
		type: "POST",
		data: { "display_state": val },
		success: function (data) {
			console.log(data);
		}
	});
}

$('#showScore').click(function () {
	shiftLastPress(this);
	setScreen(2);
});

$('#showReveal').click(function () {
	shiftLastPress(this);
	setScreen(1);
});

$('#showBlack').click(function () {
	shiftLastPress(this);
	setScreen(3);
});