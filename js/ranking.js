var teamsOnScreen = 40;
var display = 0;

function updateRanks() {
	$.ajax({
		url: "./php/GetRank.php",
		success: function (data) {
			console.log(data);
			var info = JSON.parse(data);			// Make an array of JS objects from the JSON string
			var newHTML = "";						// HTML to put in the table

			for (var i = display; i < display + teamsOnScreen && i < info.length; i++) { // Add the info to newHTML
				var team = info[i];

				newHTML += "<tr class='row'>";
				newHTML += "<td class='dark'>" + (i + 1) + "</td>";
				newHTML += "<td class='dark'>" + team["team_num"] + "</td>";
				//newHTML += "<td class='dark'>" + team["team_name"] + "</td>";
				newHTML += "<td class='light'>" + team["qualification_score"] + "</td>";
				newHTML += "<td class='light'>" + team["endgame_score"] + "</td>";
				newHTML += "<td class='light'>" + team["auto_score"] + "</td>";
				newHTML += "<td class='light'>" + team["tele_score"] + "</td>";
				newHTML += "</tr>";
			}

			$("#tableBody").html(newHTML); 			// Add to HTML table

			$("#pagenumber").html("Displaying page " + (display / teamsOnScreen + 1) + " of " + Math.ceil(info.length / teamsOnScreen));

			display += teamsOnScreen;				// Display the next page of teams
			if (display >= info.length)
				display = 0;
		}
	});
}

$(document).ready(function () {
	updateRanks();
	setInterval(updateRanks, 10000);
});