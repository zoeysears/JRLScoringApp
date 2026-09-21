var numMatches = 9;   // keep this at the top of createTeam.js

// ---------- helper: safely pick a team that hasn't appeared recently ----------
function pickAvailable(tempArray, matchArray, lookback) {
    // Make a shuffled copy of the remaining teams
    var candidates = tempArray.slice();
    for (var i = candidates.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = candidates[i];
        candidates[i] = candidates[j];
        candidates[j] = tmp;
    }

    var start = Math.max(0, matchArray.length - lookback);

    // Prefer a team that is NOT in the recent window
    for (var c = 0; c < candidates.length; c++) {
        var team = candidates[c];
        var found = false;
        for (var r = start; r < matchArray.length; r++) {
            if (matchArray[r] === team) {
                found = true;
                break;
            }
        }
        if (!found) {
            return team;          // first conflict-free team
        }
    }

    // Every remaining team conflicts → just take the first one
    // (prevents infinite loop)
    return candidates[0];
}

// ---------- main schedule generator ----------
$('#generateSchedule').click(function () {
    $.ajax({
        url: "./php/getTeams.php",
        success: function (data) {
            var info;
            try {
                info = $.parseJSON(data);
            } catch (e) {
                console.error("Could not parse teams JSON", e);
                alert("Failed to load teams");
                return;
            }

            var numTeams = info.length;
            console.log("Number of teams:", numTeams);

            if (numTeams < 6) {
                alert("Need at least 6 teams to generate a schedule");
                return;
            }

            var originalArray = [];
            for (var i = 0; i < numTeams; i++) {
                originalArray[i] = i;          // indices into the teams array
            }

            var matchArray = [];
            var tempArray;

            // Build numMatches full rounds
            for (var round = 0; round < numMatches; round++) {
                tempArray = originalArray.slice(0);

                while (tempArray.length > 0) {
                    var team = pickAvailable(tempArray, matchArray, 12); // look back ~2 matches
                    var idx  = tempArray.indexOf(team);
                    matchArray.push(team);
                    tempArray.splice(idx, 1);
                }
            }

            // Add surrogates so total length is divisible by 6
            tempArray = originalArray.slice(0);
            while (matchArray.length % 6 !== 0) {
                var team = pickAvailable(tempArray, matchArray, 8);
                var idx  = tempArray.indexOf(team);
                matchArray.push(team);
                tempArray.splice(idx, 1);

                // safety: if we somehow emptied tempArray, refill it
                if (tempArray.length === 0) {
                    tempArray = originalArray.slice(0);
                }
            }

            console.log("Schedule built. Total slots:", matchArray.length);
            console.log("Matches that will be created:", matchArray.length / 6);

            createMatches(matchArray, info);
        },
        error: function (xhr, status, err) {
            console.error("getTeams failed", status, err);
            alert("Could not load teams from server");
        }
    });
});

// ---------- create the matches on the server ----------
function createMatches(matches, teams) {
    if (!confirm("Generate " + (matches.length / 6) + " matches?\nThis will delete all existing matches.")) {
        return;
    }

    // First delete everything
    $.ajax({
        type: "POST",
        url: "./php/deleteMatches.php",
        data: { "delete": true },
        success: function () {
            console.log("Old matches deleted");

            var total = matches.length / 6;
            var completed = 0;
            var failed = 0;

            // Create matches one-by-one (safer than firing all at once)
            function createNext(i) {
                if (i >= total) {
                    console.log("Finished. Created:", completed, " Failed:", failed);
                    alert("Schedule generation finished.\nCreated: " + completed + "\nFailed: " + failed);
                    return;
                }

                var matchNum = i + 1;
                var data = {
                    match_num: matchNum.toString(),
                    blue1: teams[matches[i * 6    ]]["team_num"],
                    blue2: teams[matches[i * 6 + 1]]["team_num"],
                    blue3: teams[matches[i * 6 + 2]]["team_num"],
                    red1:  teams[matches[i * 6 + 3]]["team_num"],
                    red2:  teams[matches[i * 6 + 4]]["team_num"],
                    red3:  teams[matches[i * 6 + 5]]["team_num"]
                };

                $.ajax({
                    type: "POST",
                    url: "./php/createMatch.php",
                    data: data,
                    success: function (resp) {
                        console.log("Match", matchNum, "created:", resp);
                        completed++;
                        createNext(i + 1);
                    },
                    error: function (xhr, status, err) {
                        console.error("Failed to create match", matchNum, status, err);
                        failed++;
                        createNext(i + 1);   // continue even if one fails
                    }
                });
            }

            createNext(0);   // start the chain
        },
        error: function (xhr, status, err) {
            console.error("deleteMatches failed", status, err);
            alert("Could not delete existing matches");
        }
    });
}

$('#download').click(function () {
    $.ajax({
        url: './php/GetMatches.php',
        success: function (data) {
            var matches = $.parseJSON(data);
            var output = "";
            for (var key in matches) {
                output += key + ", " + matches[key]["blue1"] + ", " + matches[key]["blue2"] + ", " + matches[key]["blue3"] + ", " + matches[key]["red1"] + ", " + matches[key]["red2"] + ", " + matches[key]["red3"] + "\n";
            }
            download("schedule.txt", output);
        }
    });
});


$('#submitTeam').click(function () {
    $.ajax({
        type: 'POST',
        url: './php/createTeam.php',
        data: {
            "team_num": $('#team_num').val(),
            "team_name": $('#team_name').val()
        },
        success: function (data) {
            console.log("team " + $('#team_num').val() + "created: " + data);
            $('#team_num').val("");
            $('#team_name').val("")
        }
    });
});
