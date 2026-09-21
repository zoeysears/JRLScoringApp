var counter = {
  red_mob: 0,
  blue_mob: 0,

  blue_auto_gp1_high: 0,
  blue_auto_gp1_low: 0,
  blue_auto_gp2_high: 0,
  blue_auto_gp2_low: 0,

  blue_tele_gp1_high: 0,
  blue_tele_gp1_low: 0,
  blue_tele_gp2_high: 0,
  blue_tele_gp2_low: 0,

  red_auto_gp1_high: 0,
  red_auto_gp1_low: 0,
  red_auto_gp2_high: 0,
  red_auto_gp2_low: 0,

  red_tele_gp1_high: 0,
  red_tele_gp1_low: 0,
  red_tele_gp2_high: 0,
  red_tele_gp2_low: 0,

  red_climb: 0,
  red_park: 0,
  
  blue_climb: 0,
  blue_park: 0,

  red_foul: 0,
  red_tech_foul: 0,
  
  blue_foul: 0,
  blue_tech_foul: 0,
};
pos = "blue1";
lastTeamNum = 0;
scoreConfirm = false;

var RadioGroups = {
  Endgame1: [-1, []],
  Endgame2: [-1, []],
  Endgame3: [-1, []],
};

function ResetRadio(init = false) {
  var RadioBtns = [];
  var groups = ["BlueEndgame", "RedEndgame"];

  RadioGroups["Endgame1"][0] = -1;
  RadioGroups["Endgame2"][0] = -1;
  RadioGroups["Endgame3"][0] = -1;

  //itterates through each child of 'groups' and adds any child with 'RadioGroup' attribute to 'RadioBtns'
  groups.forEach((element, index) => {
    var list = document.getElementById(element).children;
    for (let i = 0; i < list.length; i++) {
      if (list[i].hasAttribute("RadioGroup")) {
        RadioBtns.push(list[i]);
      }
    }
  });

  RadioBtns.forEach((element, index) => {
    if (init) RadioGroups[element.getAttribute("RadioGroup")][1].push(element);
    // element.style.backgroundColor = "#666"; //initial color
    element.classList.remove("selected");
  });
}

$(document).ready(function () {
  ResetRadio(true);
  $("#position_select").change(function () {
    if ($(this).val().includes("red")) {
      $("#RedSide").show();
      $("#BlueSide").hide();
    } else {
      $("#RedSide").hide();
      $("#BlueSide").show();
    }
  });

  setInterval(function () {
    $.ajax({
      url: "./php/getTeamNumber.php",
      data: {
        position: $("#position_select").val(),
      },
      type: "POST",
      success: function (data) {
        let teamNum = parseInt(data);

        if (!isNaN(teamNum) && teamNum !== lastTeamNum) {
          for (id in counter) {
            counter[id] = 0;

            let ele = document.getElementById(id + "Counter");

            if (ele) ele.innerHTML = 0;
          }

          lastTeamNum = teamNum;
        }
      },
    });
  }, 500);
});

$("#confirmBtn").click(function () {
  toggleConfirm();
});

function toggleConfirm() {
  scoreConfirm = !scoreConfirm;
  const btn = document.getElementById("confirmBtn");
	console.log(scoreConfirm);
  if (scoreConfirm) {
    btn.classList.add("confirmed");
  } else {
    btn.classList.remove("confirmed");
  }

	var data = {};
	switch($("#position_select").val()){ //gets blue/red of scorer dropdown
		case "red":
			data = { "red_confirm": scoreConfirm? 1:0 };
		break;
		case "blue":
			data = { "blue_confirm": scoreConfirm? 1:0 };
		break;
	}
	console.log(data);
	$.ajax({
		url: "./php/updateStatus.php",
		type: "POST",
		data: data,
		success: function (data) {
			console.log(data);
		}
	});
}

$("#reset").click(function () {
  soreConfirm = false;
  for (id in counter) {
    counter[id] = 0;
    var dom = document.getElementById(id + "Counter");
    if (dom) dom.innerHTML = 0;
  }

  ResetRadio();
  if (scoreConfirm) toggleConfirm();
});

function add(ele) {
  var id = ele.id;
  id = id.replace("AddButton", "");
  counter[id]++;
  var max = ele.getAttribute("max");
  if (max != null) {
    if (counter[id] > parseInt(max)) {
      counter[id] = max;
    }
  }
  document.getElementById(id + "Counter").innerHTML = counter[id];
  sendScore(id);
}

function sub(ele) {
  var id = ele.id;
  id = id.replace("SubButton", "");
  counter[id]--;
  var min = ele.getAttribute("min");
  if (min != null) {
    if (counter[id] < parseInt(min)) {
      counter[id] = min;
    }
  }
  document.getElementById(id + "Counter").innerHTML = counter[id];
  sendScore(id);
}

function RadioClick(ele) {
  var myGroup = RadioGroups[ele.getAttribute("RadioGroup")];
  //console.log(ele.getAttribute("RadioGroup"))
  //console.log(myGroup)
  if (myGroup[0] != -1) {
    //dont try and mess with last index if last is -1
    if (myGroup[1][myGroup[0]] == ele) {
      //if selected button is the same
      return;
    }

    oldButton = myGroup[1][myGroup[0]]; //prev selected button
    //console.log(oldButton)
    // oldButton.style.backgroundColor = "#666"; //un-selected color
    oldButton.classList.remove("selected");

    if (oldButton.id != "_") {
      //ignore if previous selection is '_' id
      counter[oldButton.id]--; //decrement previously selected button's counter
      if (counter[oldButton.id] < 0) counter[oldButton.id] = 0;
      sendScore(oldButton.id);
    }
  }
  //console.log(ele)

  myGroup[1].forEach((element, index) => {
    //console.log(element)
    if (element == ele) {
      myGroup[0] = index; //sets new selected index
      // element.style.backgroundColor = "#3f3"; //selected color
      element.classList.add("selected");
      counter[element.id]++; //increment newly selected button's counter
      return;
    }
  });

  if (ele.id != "_") {
    sendScore(ele.id);
  }
}

function checkChange(ele) {
  //unused
  counter[ele.id] = ele.checked ? 1 : 0;
  sendScore(ele.id);
}

function sendScore(id) {;
  console.log("send score: " + id);
  // var key = alliance + "_" + id;
  var key = id;
  $.ajax({
    //give the url to go to (the .. means go up a folder)
    url: "./php/GetStatus.php",

    //this says what todo as soon as all the data has been loaded
    success: function (data) {
      var info2 = $.parseJSON(data);
      console.log(info2["score_lock"]);
      if (info2["score_lock"] == "0") {
        var vals = { [key]: counter[id] };
        console.log(vals);
        $.ajax({
          //give the url to go to (the .. means go up a folder)
          url: "./php/sendScore.php",
          data: vals,
          type: "POST",
          //this says what todo as soon as all the data has been loaded
          success: function (info) {
            console.log(info);
          },
        });
      }
    },
  });
}
