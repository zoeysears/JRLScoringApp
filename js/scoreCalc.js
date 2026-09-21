
var MAX_MATCHES = 8;

function min(x,y){
	if (x>y){
		return y;
	}
	return x;
}

var redScore = 0;

var redTeleScore = 0;
var redAutoScore = 0;
var redEndgameScore = 0;

var blueScore = 0;

var blueTeleScore = 0;
var blueAutoScore = 0;
var blueEndgameScore = 0;

//TO DO FIX ARBITRATORY VALUES
function calcScoreFromData(info) {
    console.log("calc from data")
    redScore = 0;
    redTeleScore = 0;
    redAutoScore = 0;
    redEndgameScore = 0;

    blueScore = 0;
    blueTeleScore = 0;
    blueAutoScore = 0;
    blueEndgameScore = 0;
	
	redPenalties = 0;
	bluePenalties = 0;
	
	redPenalties += parseInt(info["red_foul"]) * 5;
	redPenalties += parseInt(info["red_tech_foul"]) * 15;

	bluePenalties += parseInt(info["blue_foul"]) * 5;
	bluePenalties += parseInt(info["blue_tech_foul"]) * 15;

    redAutoScore += parseInt(info["red_mob"]) * 7;

    redAutoScore += parseInt(info["red_auto_gp1_high"]) *8;
    redAutoScore += parseInt(info["red_auto_gp1_low"]) *10;
    redAutoScore += parseInt(info["red_auto_gp2_high"]) *5;
    redAutoScore += parseInt(info["red_auto_gp2_low"]) *6;

    redTeleScore += parseInt(info["red_tele_gp1_high"]) *5;
    redTeleScore += parseInt(info["red_tele_gp1_low"]) *8;
    redTeleScore += parseInt(info["red_tele_gp2_high"]) *3;
    redTeleScore += parseInt(info["red_tele_gp2_low"]) *5;
		
	redEndgameScore += parseInt(info["red_climb"]) * 15;
	redEndgameScore += parseInt(info["red_park"]) * 7;
	
    redScore = redEndgameScore + redAutoScore + redTeleScore + bluePenalties;
    console.log(redScore);
	
	//--------------------------------------------//
	//--------------------------------------------//
	
    blueAutoScore += parseInt(info["blue_mob"]) * 7;

    blueAutoScore += parseInt(info["blue_auto_gp1_high"]) *8;
    blueAutoScore += parseInt(info["blue_auto_gp1_low"]) * 10;
    blueAutoScore += parseInt(info["blue_auto_gp2_high"]) *5;
    blueAutoScore += parseInt(info["blue_auto_gp2_low"]) *6;

    blueTeleScore += parseInt(info["blue_tele_gp1_high"]) *5;
    blueTeleScore += parseInt(info["blue_tele_gp1_low"]) *8;
    blueTeleScore += parseInt(info["blue_tele_gp2_high"]) *3;
    blueTeleScore += parseInt(info["blue_tele_gp2_low"]) *5;
		
	blueEndgameScore += parseInt(info["blue_climb"]) * 15;
	blueEndgameScore += parseInt(info["blue_park"]) * 7;
	
    blueScore = blueEndgameScore + blueAutoScore + blueTeleScore + redPenalties;
    console.log(blueScore);


    var scores = {
        red_score: redScore,
        red_auto_score: redAutoScore,
		red_tele_score: redTeleScore,
        red_endgame_score: redEndgameScore,
		red_penalties: redPenalties,
		
        blue_score: blueScore,
        blue_auto_score: blueAutoScore,
        blue_tele_score: blueTeleScore,
        blue_endgame_score: blueEndgameScore,
		blue_penalties: bluePenalties
    };
    return scores;
}

function calcScoreFromMatchJSON(json) {
    //convert the JSON string to a JavaScript object (also called a key:value array)
    var info = $.parseJSON(json)[0];
    var scores = calcScoreFromData(info);
    return scores;
}



function calcScore() {
    var blueScore = 0;
    var redScore = 0;
    var scores = {};
	console.log(blueEndgameScore ,blueAutoScore ,blueTeleScore)
    $.ajax({
        //give the url to go to (the .. means go up a folder)
        url: './php/GetCurrentMatch.php',

        //this says what todo as soon as all the data has been loaded
        success: function (data) {
            scores = calcScoreFromMatchJSON(data);
            $.ajax({
                url: './php/updateStatus.php',
                data: scores,
                type: 'POST',
                success: function (data) {

                }
            });


        }
    });
    return scores;
}

function updateTeamsInMatch(match_num) {
    var updatedData = [];
    var data = { "match_num": match_num };
    $.ajax({
        url: './php/getMatch.php',
        data: data,
        type: 'POST',
        success: function (data) {
            //convert the JSON string to a JavaScript object (also called a key:value array)
            var info = $.parseJSON(data)[0];
            var scores = calcScoreFromMatchJSON(data);
			console.log("Score data from match: "+match_num);
			console.log(scores);
            // 0 is red win, 1 is blue win, 2 is tie
            var winScenario = 0;
            if (scores["blue_score"] > scores["red_score"]) {
                winScenario = 1;
            } else if (scores["blue_score"] == scores["red_score"]) {
                winScenario = 2;
            }

            var positions = ['red1', 'red2','red3', 'blue1', 'blue2','blue3'];
            positions.forEach(function (pos) {
                addMatchToTeam(pos, info, scores, winScenario);
            });


        }
    });
}


function addMatchToTeam(pos, matchData, scores, winScenario) {
    $.ajax({
        url: './php/getTeamData.php',
        data: { "team_num": matchData[pos] },
        type: 'POST',
        success: function (y) {
			console.log(y);
			//if (y.startsWith("0 results", 0)) return;
            var teamData = $.parseJSON(y);
            var newData = { "team_num": matchData[pos] };
            newData["matches_played"] = parseInt(teamData["matches_played"]) + 1;
            newData["qualification_score"] = parseInt(teamData["qualification_score"]);

            //ZOEY TEST THIS BLOCK OF CODE DON"T REALLY UNDERSTAND
            var alliance = pos.slice(0, -1);
            console.log(alliance);
            if (winScenario == 2) {
                newData["qualification_score"] += 1;
            } else if (alliance == "blue") {
                if (winScenario == 1) {
                    newData["qualification_score"] += 2;
                }
            } else {
                if (winScenario == 0) {
                    newData["qualification_score"] += 2;
                }
            }

            newData["auto_score"] = parseInt(teamData["auto_score"]) + scores[alliance + "_auto_score"];
            newData["tele_score"] = parseInt(teamData["tele_score"]) + scores[alliance + "_tele_score"];
            newData["endgame_score"] = parseInt(teamData["endgame_score"]) + scores[alliance + "_endgame_score"];
            if (newData["matches_played"] <= MAX_MATCHES){
				updateTeamData(newData);
			}
        }
    });
}

function clearTeamData() {

	var newData = {
		"endgame_score": 0,
		"auto_score": 0,
		"tele_score": 0,
		"qualification_score": 0,
		"matches_played": 0
		
	};
    $.ajax({
        url: './php/getTeams.php',
        data: newData,
        type: 'POST',
        success: function (data) {

            var teamData = $.parseJSON(data);
            for (var i = 0; i < teamData.length; i++) {
                var teamNum = teamData[i]["team_num"];
                newData["team_num"] = teamNum;
                updateTeamData(newData);
            }
			
            console.log("Cleared team data");
        }
    });
}

function updateTeamData(data) {
    $.ajax({
        url: './php/updateTeam.php',
        data: data,
        type: 'POST',
        success: function (info) {
            console.log("update team data: " + info);
        }
    });
}

async function updateTeamRanks() {
    if (!confirm("This will RESET and recalculate ALL team rankings from scratch.\n\nAre you sure?")) {
        return;
    }

    console.log("🚀 Starting full team rank recalculation...");

    try {
        // Step 1: Clear existing team data
        await clearTeamDataPromise();
        console.log("✅ Team data cleared.");

        // Step 2: Get all matches
        const data = await $.ajax({
            url: './php/getMatches.php',
            type: 'GET'
        });

        const matches = $.parseJSON(data);
        console.log(`📊 Found ${matches.length} matches. Processing played matches...`);

        let processed = 0;

        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];

            if (parseInt(match["played"]) === 1) {
                const scores = calcScoreFromData(match);

                let winScenario = 0; // 0 = red win, 1 = blue win, 2 = tie
                if (scores["blue_score"] > scores["red_score"]) {
                    winScenario = 1;
                } else if (scores["blue_score"] === scores["red_score"]) {
                    winScenario = 2;
                }

                const positions = ['red1', 'red2', 'red3', 'blue1', 'blue2', 'blue3'];

                // Process all 6 teams for this match
                for (let pos of positions) {
                    await addMatchToTeamPromise(pos, match, scores, winScenario);
                }

                processed++;
                console.log(`✅ Processed match ${match["match_num"]} (${processed} total)`);
            }
        }

        console.log(`🎉 Team rank recalculation completed! ${processed} matches processed.`);
        alert(`Team rankings successfully recalculated!\n${processed} matches processed.`);

    } catch (error) {
        console.error("❌ Error during rank update:", error);
        alert("An error occurred while updating team ranks. Check console for details.");
    }
}

// Helper to turn clearTeamData into a Promise
function clearTeamDataPromise() {
    return new Promise((resolve) => {
        clearTeamData();           // Your existing function
        // Give it a small delay to finish
        setTimeout(resolve, 800);
    });
}

// Helper to turn addMatchToTeam into a Promise (since it uses AJAX)
function addMatchToTeamPromise(pos, matchData, scores, winScenario) {
    return new Promise((resolve) => {
        // Temporarily override the success callback to resolve the promise
        const originalSuccess = addMatchToTeam; // backup if needed

        // Call your existing function - it already does the AJAX inside
        addMatchToTeam(pos, matchData, scores, winScenario);

        // Since your addMatchToTeam doesn't return a promise, we resolve after a short delay
        // (Better solution would be to modify addMatchToTeam later)
        setTimeout(resolve, 300);
    });
}