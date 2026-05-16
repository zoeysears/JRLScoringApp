var view;
var allMatches;
var info;

function refreshMatch(view) {
	$.ajax({
		url: "./php/getMatches.php",
		success: function (data) {
			allMatches = JSON.parse(data);
			for (var i; i < allMatches.length; i++) {
				if (allMatches[i]["match_num"] == view) {
					info += allMatches[i];
				}
			}
			info += allMatches;

			$("#yeet").html(info);
			document.getElementById("yeet").innerHTML = data;

		}

	});
}

$(document).ready(function () {
	refreshMatch(0);
});