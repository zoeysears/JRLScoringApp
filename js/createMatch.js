$('#submit').click(function () {
    $.ajax({
        type: 'POST',
        url: './php/createMatch.php',
        data: {
            "blue1": $('#blue1').val(),
            "blue2": $('#blue2').val(),
            "blue3": $('#blue3').val(),
            "red1": $('#red1').val(),
            "red2": $('#red2').val(),
            "red3": $('#red3').val(),
            "match_num": $('#match_num').val()
        },
        success: function (data) {
            console.log(data);
            $('#blue1').val("");
            $('#blue2').val("");
            $('#blue3').val("");
            $('#red1').val("");
            $('#red2').val("");
            $('#red3').val("");
            $('#match_num').val(parseInt($('#match_num').val()) + 1);
        }
    });
});

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

$('#replaceMatches').click(function () {
    var obj = null;
    try {
        obj = $.parseJSON($('#json').val());
    } catch (e) {
        alert(e);
    }

    if (obj !== null) {
        if (confirm("Are you sure? All data will be deleted.") == false) {
            return;
        }
        $.ajax({
            url: './php/deleteMatches.php',
            type: "POST",
            data: { "delete": true },
            success: function (data) {
                console.log(data);
                for (x in obj) {
                    $.ajax({
                        url: './php/createMatchesFromBackup.php',
                        data: obj[x],
                        type: "POST",
                        success: function (data) {
                            console.log(data);
                        }
                    });
                }
            }
        });

    }
});

$('#archive').click(function () {
    $.ajax({
        url: './php/GetMatches.php',
        success: function (data) {
            date = Date().toString();
            download(date + "_backup.txt", data);
        }
    });
});