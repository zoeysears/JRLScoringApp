// ====================== CONFIG ======================
const START_MATCH_SOUND = new Audio("./sounds/1_match_start.wav"); // Add your sound files
const ENDGAME_SOUND = new Audio("./sounds/4_match_endgame.wav");
const AUTO_END = new Audio("./sounds/2_autonomous_end.wav");
const MATCH_END = new Audio("./sounds/5_match_end.wav");

let lastDisplayState = 2;
let lastMatchTime = 140;
let revealScore = false;
let lastData = {};
let updatedScore = {};

START_MATCH_SOUND.load();

// ====================== MAIN UPDATE LOOP ======================
$(document).ready(function () {
  $("#RedWin, #BlueWin, #Tie, #ScoreReveal").hide();

  setInterval(async function () {
    try {
      const response = await $.ajax({ url: "./php/GetStatus.php" });
      const info = $.parseJSON(response);
      lastData = info;

      const matchNum = parseInt(info["match_num"] || 0);
      const timeLeft = parseInt(info["match_time"] || 140);
      const displayState = parseInt(info["display_state"] || 2);

      // Update basic info
      updateMatchNumber(matchNum);
      updateTeamsAndScores(info);
      updateTime(timeLeft);
      calcScore();

      // Handle timer sounds
      handleTimerSounds(timeLeft);

      // Handle display states from Score Controller
      handleDisplayState(displayState, timeLeft);
    } catch (e) {
      console.error("LiveScore update error:", e);
    }
  }, 250);
});

// ====================== HELPER FUNCTIONS ======================

function updateMatchNumber(matchNum) {
  let text = "Match # " + matchNum;
  if (matchNum < 300 && matchNum > 200) {
    text = "Practice Match #" + (matchNum -200);
  } else if (matchNum < 400 && matchNum > 300) {
    text="Pre-Quarters #" + (matchNum - 300);
  } else if (matchNum < 500 && matchNum > 400) {
    text = "Quarter Finals #" + (matchNum - 400);
  } else if (matchNum < 600 && matchNum > 500) {
    text ="Elims Match #" + (matchNum - 500);
  } else if (matchNum < 700 && matchNum > 600) {
    text=  "Finals #" + (matchNum - 600);
  } else {
    text = ("Match # " + matchNum);
  }

  $("#matchNum").html(text);
  $("#rev_matchNum").html(text);
}

function updateTeamsAndScores(info) {
  $("#blue1").html(info["blue1"] || "?");
  $("#blue2").html(info["blue2"] || "?");
  $("#blue3").html(info["blue3"] || "?");
  $("#red1").html(info["red1"] || "?");
  $("#red2").html(info["red2"] || "?");
  $("#red3").html(info["red3"] || "?");

  $("#blueScore").html(info["blue_score"] || 0);
  $("#redScore").html(info["red_score"] || 0);
}

function updateTime(newTime) {
  const min = Math.floor(newTime / 60);
  let sec = newTime % 60;
  const display = `${min}:${sec < 10 ? "0" : ""}${sec}`;
  $("#time").html(display);
}

function handleTimerSounds(timeLeft) {
  console.log(timeLeft);
  if (timeLeft === 135 && lastMatchTime !== 135) {
    START_MATCH_SOUND.currentTime = 0.25;
    START_MATCH_SOUND.play().catch(() => {});
  }

  if (timeLeft == 120 && lastMatchTime !== 120) {
    AUTO_END.currentTime = 0;
    AUTO_END.play().catch(() => {});
  }

  if (timeLeft === 30 && lastMatchTime !== 30) {
    ENDGAME_SOUND.currentTime = 0.0;
    ENDGAME_SOUND.play().catch(() => {});
  }

  if (timeLeft == 0 && lastMatchTime!=0) {
    MATCH_END.currentTime = 0;
    MATCH_END.play().catch(() => {});
  }
  lastMatchTime = timeLeft;
}

async function handleDisplayState(state, timeLeft) {
  if (state === 3) {
    // Black / Background
    $("#centered, #Videos, #ScoreReveal").hide();
    $("#background").show();
    revealScore = false;
  } else if (state === 2) {
    // Normal Match View
    $("#Videos, #ScoreReveal").hide();
    $("#centered").show();
    $("#background").show(); // or hide if you prefer dark
    revealScore = false;
  } else if (state === 1) {
    // Reveal Breakdown
    $("#centered, #Videos").hide();
    $("#ScoreReveal").show();
    $("#background").show();
    revealScore = true;
    updateReveal();
  }
}

async function updateReveal() {
  if (!lastData) return;

  const scores = await calcDisplayScore();
  $("#rev_matchNum").html(
    $("#matchNum").html() || `Match # ${lastData.match_num || ""}`,
  );

  $("#redTeams").html(
    `${lastData.red1 || "?"} &nbsp; ${lastData.red2 || "?"} &nbsp; ${lastData.red3 || "?"}`,
  );
  $("#blueTeams").html(
    `${lastData.blue1 || "?"} &nbsp; ${lastData.blue2 || "?"} &nbsp; ${lastData.blue3 || "?"}`,
  );

  // Red

  $("#redAutoBreakdown").html(
    `Mob: ${scores.red_mob || 0} <br> GP1H: ${scores.red_auto_gp1_high || 0} <br> GP1L: ${scores.red_auto_gp1_low || 0} <br> GP2H: ${scores.red_auto_gp2_high || 0} <br> GP2L: ${scores.red_auto_gp2_low || 0}`,
  );
  $("#redTeleBreakdown").html(
    `GP1H: ${scores.red_tele_gp1_high || 0} <br> GP1L: ${scores.red_tele_gp1_low || 0} <br> GP2H: ${scores.red_tele_gp2_high || 0} <br> GP2L: ${scores.red_tele_gp2_low || 0}`,
  );
  $("#redEndBreakdown").html(
    `Park: ${scores.red_park || 0} <br> Climb: ${scores.red_climb || 0}`,
  );
   $("#redPenaltiesBreakdown").html(
    `Penalties: ${scores.red_foul || 0} <br> Tech Foul: ${scores.red_tech_foul || 0}`,
  );
  $("#redGrandTotal").html(lastData.red_score || 0);

  // Blue
  $("#blueAutoBreakdown").html(
    `Mob: ${scores.blue_mob || 0} <br> GP1H: ${scores.blue_auto_gp1_high || 0} <br> GP1L: ${scores.blue_auto_gp1_low || 0} <br> GP2H: ${scores.blue_auto_gp2_high || 0} <br> GP2L: ${scores.blue_auto_gp2_low || 0}`,
  );
  $("#blueTeleBreakdown").html(
    `GP1H: ${scores.blue_tele_gp1_high || 0} <br> GP1L: ${scores.blue_tele_gp1_low || 0} <br> GP2H: ${scores.blue_tele_gp2_high || 0} <br> GP2L: ${scores.blue_tele_gp2_low || 0}`,
  );
  $("#blueEndBreakdown").html(
    `Park: ${scores.blue_park || 0} <br> Climb: ${scores.blue_climb || 0}`,
  );
   $("#bluePenaltiesBreakdown").html(
    `Penalties: ${scores.blue_foul || 0} <br> Tech Foul: ${scores.blue_tech_foul || 0}`,
  );
  $("#blueGrandTotal").html(lastData.blue_score || 0);
}

//WILL ALSO NEED TO UDPATE
function calcDisplayScoreFromData(info) {

  var values = {
    red_foul: parseInt(info["red_foul"]) * 5,
    red_tech_foul: parseInt(info["red_tech_foul"]) * 15,
    blue_foul: parseInt(info["blue_foul"]) * 5,
    blue_tech_foul: parseInt(info["blue_tech_foul"]) * 15,
    red_mob: parseInt(info["red_mob"]) * 7,

    red_auto_gp1_high: parseInt(info["red_auto_gp1_high"]) * 8,
    red_auto_gp1_low: parseInt(info["red_auto_gp1_low"]) * 10,
    red_auto_gp2_high: parseInt(info["red_auto_gp2_high"]) * 5,
    red_auto_gp2_low: parseInt(info["red_auto_gp2_low"]) * 6,

    red_tele_gp1_high: parseInt(info["red_tele_gp1_high"]) * 5,
    red_tele_gp1_low: parseInt(info["red_tele_gp1_low"]) * 8,
    red_tele_gp2_high: parseInt(info["red_tele_gp2_high"]) * 3,
    red_tele_gp2_low: parseInt(info["red_tele_gp2_low"]) * 5,

    red_climb: parseInt(info["red_climb"]) * 15,
    red_park: parseInt(info["red_park"]) * 7,

    blue_mob: parseInt(info["blue_mob"]) * 7,

    blue_auto_gp1_high: parseInt(info["blue_auto_gp1_high"]) * 8,
    blue_auto_gp1_low: parseInt(info["blue_auto_gp1_low"]) * 10,
    blue_auto_gp2_high: parseInt(info["blue_auto_gp2_high"]) * 5,
    blue_auto_gp2_low: parseInt(info["blue_auto_gp2_low"]) * 6,

    blue_tele_gp1_high: parseInt(info["blue_tele_gp1_high"]) * 5,
    blue_tele_gp1_low: parseInt(info["blue_tele_gp1_low"]) * 8,
    blue_tele_gp2_high: parseInt(info["blue_tele_gp2_high"]) * 3,
    blue_tele_gp2_low: parseInt(info["blue_tele_gp2_low"]) * 5,

    blue_climb: parseInt(info["blue_climb"]) * 15,
    blue_park: parseInt(info["blue_park"]) * 7,
  };

  return values;
}

function calcDisplayScoreFromMatchJSON(json) {
  //convert the JSON string to a JavaScript object (also called a key:value array)
  var info = $.parseJSON(json)[0];
  var scores = calcDisplayScoreFromData(info);
  return scores;
}

async function calcDisplayScore() {
  let data = await $.ajax({
    url: "./php/GetCurrentMatch.php"
  });
  return  calcDisplayScoreFromMatchJSON(data);
}