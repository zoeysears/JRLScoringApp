var numMatches = 9;

function createMatches(matches, teams) {
    if (confirm("would you like to generate matches?")) {
        var matchNum;
        $.ajax({
            type: "POST",
            data: { "delete": true },
            url: "./php/deleteMatches.php",
            success: function (data) {

                for (var i = 0; i < matches.length / 6; i++) {
                    matchNum = (i + 1);
                    /*if(matchNum <= 12)
                        matchNum += 200;
                    else
                        matchNum -= 12;*/
                    $.ajax({
                        type: "POST",
                        url: "./php/createMatch.php",
                        data: {
                            "match_num": matchNum.toString(),
                            //"match_name":"Q"+matchNum.toString(),
                            "blue1": teams[matches[i * 6]]["team_num"],
                            "blue2": teams[matches[i * 6 + 1]]["team_num"],
                            "blue3": teams[matches[i * 6 + 2]]["team_num"],
                            "red1": teams[matches[i * 6 + 3]]["team_num"],
                            "red2": teams[matches[i * 6 + 4]]["team_num"],
                            "red3": teams[matches[i * 6 + 5]]["team_num"]
                        },
                        success: function (data) {
                            console.log(data);
                        }
                    });
                }
            }
        })
    }
}

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

$('#createTestTeams').click(function () {
    if (confirm("Are you sure you want to delete all teams?")) {
        $.ajax({
            type: "POST",
            data: { "delete": true },
            url: "./php/deleteTeams.php",
            success: function (data) {
                console.log(data);
                for (var i = 1; i <= 36; i++) {
                    $.ajax({
                        type: 'POST',
                        url: './php/createTeam.php',
                        data: {
                            "team_num": i.toString(),
                            "team_name": "Team " + i.toString()
                        },
                        success: function (data) {
                            console.log("team " + $('#team_num').val() + "created: " + data);
                        }
                    });
                }
            }
        });
    }
});

$('#generateSchedule').click(function () {
    $.ajax({
        url: "./php/getTeams.php",
        success: function (data) {
            var info = $.parseJSON(data);
            numTeams = info.length;
            console.log(numTeams);
            var originalArray = [], tempArray = [], matchArray = [];
            for (var i = 0; i < numTeams; i++) {
                originalArray[i] = i;
            }
            tempArray = originalArray.slice(0);
            for (var i = 0; i < numMatches; i++) {
                while (tempArray.length > 0) {
                    var randIndex = Math.floor(Math.random() * tempArray.length),
                        found = false,
                        startIndex = matchArray.length - (matchArray.length % 6) - 12;
                    for (var r = startIndex; r > 0 && r < matchArray.length; r++) {
                        if (matchArray[r] == tempArray[randIndex])
                            found = true;
                    }
                    if (!found) {
                        matchArray.push(tempArray[randIndex]);
                        tempArray.splice(randIndex, 1);
                    }
                }
                tempArray = originalArray.slice(0);
            }
            //add surrogates
            while (matchArray.length % 6 != 0) {
                var randIndex = Math.floor(Math.random() * tempArray.length),
                    found = false,
                    startIndex = matchArray.length - (matchArray.length % 4) - 8;
                for (var r = startIndex; r > 0 && r < matchArray.length; r++) {
                    if (matchArray[r] == tempArray[randIndex])
                        found = true;
                }
                if (!found) {
                    matchArray.push(tempArray[randIndex]);
                    tempArray.splice(randIndex, 1);
                }
            }
            createMatches(matchArray, info);
        }
    });
});

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