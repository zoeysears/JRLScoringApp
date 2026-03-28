var teamNum;
var matches_played;
var qualification_score;
var endgame_score;
var auto_score;
var tele_score;
var teamName;


function post(path, params) {

	console.log("posting: " + JSON.stringify(params));

	$.ajax({
		url: path,
		data: params,
		type: 'POST',
		success: function (data) { console.log(data); }
	});
}

$('#setTeamNumber').click(function () {
	teamNum = document.getElementById("teamNumber").value;

	$.ajax({
		url: './php/getTeamInfo.php',
		type: 'POST',
		data: { team_num: teamNum },
		
		success: function (data) {
			var info = $.parseJSON(data);
			info = info[0];
			console.log(info)
			matches_played = info['matches_played'];
			qualification_score = info["qualification_score"];
			endgame_score = info["endgame_score"];
			auto_score = info["auto_score"];
			tele_score = info["tele_score"];
			teamName = info["team_name"];
			setTeamInfo();


		}
	});
	$.ajax({
		url: './php/getTeamMatches.php',
		type: 'POST',
		data: { team_num: teamNum},
		
		success: function (data) {
			var info = $.parseJSON(data);
			console.log(info);
			createTable(info);

		}
	})
});

function setTeamInfo () {
	document.getElementById("teamName").innerText = "Team Name: " + teamName;
	document.getElementById('teamNum').innerText = "Team Number: " + teamNum;
	document.getElementById("matchPlayed").innerHTML = "Matches Played: " + matches_played;
	document.getElementById("autoScore").innerHTML = "Auto Score: " + auto_score;
	document.getElementById("teleScore").innerHTML = "Tele Score: " + tele_score;
	document.getElementById("endgameScore").innerHTML = "Endgame Score: " + endgame_score;
	document.getElementById("qualiScore").innerHTML = "Qualification Score: " + qualification_score;
}

function createTable(data) {
	console.log(data);
    const container = document.getElementById('table-container');
 // Create <table> element
    const table = document.createElement('table');
    table.setAttribute('border', '1'); // Optional: Add a border for visibility

    // Create table header (<thead>)
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Get column names from the first object in the data array
    const colNames = Object.keys(data[0]);

    colNames.forEach(colName => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(colName));
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body (<tbody>)
    const tbody = document.createElement('tbody');

    // Iterate over the data and create rows
    data.forEach(rowData => {
        const row = document.createElement('tr');
        colNames.forEach(colName => {
            const cell = document.createElement('td');
            cell.appendChild(document.createTextNode(rowData[colName]));
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the created table to the container div
    container.appendChild(table);
}

