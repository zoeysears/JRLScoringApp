<?php
include "databaseHelper.php";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "DB Connection failed: " . $conn->connect_error]));
}

$data = $_POST;
$match_num = (int)($data['match_num'] ?? 0);

if ($match_num <= 0) {
    die(json_encode(["error" => "Invalid match number"]));
}

// Scoring multipliers - NEED TO FIX TO BE CONSISITENT WITH SCORE CALC & LIVE SCORE
$scores = [
    'mob' => 7,
    'auto_gp1_high' => 8, 'auto_gp1_low' => 10,
    'auto_gp2_high' => 5, 'auto_gp2_low' => 6,
    'tele_gp1_high' => 5, 'tele_gp1_low' => 8,
    'tele_gp2_high' => 6, 'tele_gp2_low' => 5,
    'park' => 7,
    'climb' => 15,
    'foul' => 5,
    'tech_foul' => 15
];

function getIndividualCountOfScored($d, $prefix, $gamePiece) {
    $penalty_prefix = ($prefix === 'red') ? 'blue' : 'red';
    return ($d[$prefix.'_'.$gamePiece] ?? 0);
}

function calcIndividualScoreOfGamePiece($d, $prefix, $scores, $gamePiece) {
    $penalty_prefix = ($prefix === 'red') ? 'blue' : 'red';
    return  getIndividualCountOfScored($d, $prefix, $scores, $gamePiece) * $scores[$gamePiece];
}

function calcAlliance($d, $prefix, $scores) {
    $penalty_prefix = ($prefix === 'red') ? 'blue' : 'red';
    
    $total = 0;
    // Auto
    $total += ($d[$prefix.'_mob'] ?? 0) * $scores['mob'];
    $total += ($d[$prefix.'_auto_gp1_high'] ?? 0) * $scores['auto_gp1_high'];
    $total += ($d[$prefix.'_auto_gp1_low'] ?? 0) * $scores['auto_gp1_low'];
    $total += ($d[$prefix.'_auto_gp2_high'] ?? 0) * $scores['auto_gp2_high'];
    $total += ($d[$prefix.'_auto_gp2_low'] ?? 0) * $scores['auto_gp2_low'];
    
    // Teleop
    $total += ($d[$prefix.'_tele_gp1_high'] ?? 0) * $scores['tele_gp1_high'];
    $total += ($d[$prefix.'_tele_gp1_low'] ?? 0) * $scores['tele_gp1_low'];
    $total += ($d[$prefix.'_tele_gp2_high'] ?? 0) * $scores['tele_gp2_high'];
    $total += ($d[$prefix.'_tele_gp2_low'] ?? 0) * $scores['tele_gp2_low'];
    
    // Endgame
    $total += ($d[$prefix.'_park'] ?? 0) * $scores['park'];
    $total += ($d[$prefix.'_climb'] ?? 0) * $scores['climb'];
    
    // Penalties (opponent's fouls affect you)
    $total += ($d[$penalty_prefix.'_foul'] ?? 0) * $scores['foul'];
    $total += ($d[$penalty_prefix.'_tech_foul'] ?? 0) * $scores['tech_foul'];
    
    return $total;
}

function calcAutoScore($d, $prefix, $scores) {
    $total = 0;
    $total += ($d[$prefix.'_mob'] ?? 0) * $scores['mob'];
    $total += ($d[$prefix.'_auto_gp1_high'] ?? 0) * $scores['auto_gp1_high'];
    $total += ($d[$prefix.'_auto_gp1_low'] ?? 0) * $scores['auto_gp1_low'];
    $total += ($d[$prefix.'_auto_gp2_high'] ?? 0) * $scores['auto_gp2_high'];
    $total += ($d[$prefix.'_auto_gp2_low'] ?? 0) * $scores['auto_gp2_low'];
    return $total;
}

function calcTeleScore($d, $prefix, $scores) {
    $total = 0;
    $total += ($d[$prefix.'_tele_gp1_high'] ?? 0) * $scores['tele_gp1_high'];
    $total += ($d[$prefix.'_tele_gp1_low'] ?? 0) * $scores['tele_gp1_low'];
    $total += ($d[$prefix.'_tele_gp2_high'] ?? 0) * $scores['tele_gp2_high'];
    $total += ($d[$prefix.'_tele_gp2_low'] ?? 0) * $scores['tele_gp2_low'];
    return $total;
}

function calcEndgameScore($d, $prefix, $scores) {
    $total = 0;
    $total += ($d[$prefix.'_park'] ?? 0) * $scores['park'];
    $total += ($d[$prefix.'_climb'] ?? 0) * $scores['climb'];
    return $total;
}

// Calculate total scores
$red_total   = calcAlliance($data, 'red', $scores);
$blue_total  = calcAlliance($data, 'blue', $scores);

$red_auto    = calcAutoScore($data, 'red', $scores);
$blue_auto   = calcAutoScore($data, 'blue', $scores);

$red_tele    = calcTeleScore($data, 'red', $scores);
$blue_tele   = calcTeleScore($data, 'blue', $scores);

$red_endgame = calcEndgameScore($data, 'red', $scores);
$blue_endgame= calcEndgameScore($data, 'blue', $scores);

// Ranking Points
$red_rp = ($red_total > $blue_total) ? 2 : ($red_total === $blue_total ? 1 : 0);
$blue_rp = ($blue_total > $red_total) ? 2 : ($red_total === $blue_total ? 1 : 0);

// Update matches table
$updateMatch = "UPDATE matches SET 
    played=1, 
    score_lock=1, 
    red_total_points=?, 
    blue_total_points=?, 
    red_quali_points=?, 
    blue_quali_points=? 
    WHERE match_num=?";

$stmt = $conn->prepare($updateMatch);
$stmt->bind_param("iiiii", $red_total, $blue_total, $red_rp, $blue_rp, $match_num);
$stmt->execute();

//save individual scores of each value

//calculate individual score of each element
$red_mob = getIndividualCountOfScored($data, 'red', 'mob');

$red_auto_gp1High = getIndividualCountOfScored($data, 'red', 'auto_gp1_high');
$red_auto_gp1Low = getIndividualCountOfScored($data, 'red', 'auto_gp1_low');
$red_auto_gp2High = getIndividualCountOfScored($data, 'red', 'auto_gp2_high');
$red_auto_gp2Low = getIndividualCountOfScored($data, 'red', 'auto_gp2_low');

$red_gp1High = getIndividualCountOfScored($data, 'red', 'tele_gp1_high');
$red_gp1Low = getIndividualCountOfScored($data, 'red', 'tele_gp1_low');
$red_gp2High = getIndividualCountOfScored($data, 'red', 'tele_gp2_high');
$red_gp2Low = getIndividualCountOfScored($data, 'red', 'tele_gp2_low');

$red_park = getIndividualCountOfScored($data, 'red', 'park');
$red_climb = getIndividualCountOfScored($data, 'red', 'climb');

$red_foul = getIndividualCountOfScored($data, 'red', 'foul');
$red_tech_foul = getIndividualCountOfScored($data, 'red', 'tech_foul');

//blue
$blue_mob = getIndividualCountOfScored($data, 'blue', 'mob');

$blue_auto_gp1High = getIndividualCountOfScored($data, 'blue', 'auto_gp1_high');
$blue_auto_gp1Low = getIndividualCountOfScored($data, 'blue', 'auto_gp1_low');
$blue_auto_gp2High = getIndividualCountOfScored($data, 'blue', 'auto_gp2_high');
$blue_auto_gp2Low = getIndividualCountOfScored($data, 'blue', 'auto_gp2_low');

$blue_gp1High = getIndividualCountOfScored($data, 'blue', 'tele_gp1_high');
$blue_gp1Low = getIndividualCountOfScored($data, 'blue', 'tele_gp1_low');
$blue_gp2High = getIndividualCountOfScored($data, 'blue', 'tele_gp2_high');
$blue_gp2Low = getIndividualCountOfScored($data, 'blue', 'tele_gp2_low');

$blue_park = getIndividualCountOfScored($data, 'blue', 'park');
$blue_climb = getIndividualCountOfScored($data, 'blue',  'climb');

$blue_foul = getIndividualCountOfScored($data, 'blue', 'foul');
$blue_tech_foul = getIndividualCountOfScored($data, 'blue', 'tech_foul');

// Update matches table
$updateMatch = "UPDATE matches SET 
    red_foul=?,
    red_tech_foul=?,
    red_mob=?,
    red_auto_gp1_high=?,
    red_auto_gp1_low=?,
    red_auto_gp2_high=?,
    red_auto_gp2_low=?,
    red_tele_gp1_high=?,
    red_tele_gp1_low=?,
    red_tele_gp2_high=?,
    red_tele_gp2_low=?,
    red_park=?,
    red_climb=?,
    blue_foul=?,
    blue_tech_foul=?,
    blue_mob=?,
    blue_auto_gp1_high=?,
    blue_auto_gp1_low=?,
    blue_auto_gp2_high=?,
    blue_auto_gp2_low=?,
    blue_tele_gp1_high=?,
    blue_tele_gp1_low=?,
    blue_tele_gp2_high=?,
    blue_tele_gp2_low=?,
    blue_park=?,
    blue_climb=?
    WHERE match_num=?";
$stmt = $conn->prepare($updateMatch);
$stmt->bind_param("iiiiiiiiiiiiiiiiiiiiiiiiiii", $red_foul, $red_tech_foul, $red_mob, $red_auto_gp1High, $red_auto_gp1Low, $red_auto_gp2High, $red_auto_gp2Low, $red_gp1High, $red_gp1Low, $red_gp2High, $red_gp2Low, $red_park, $red_climb, $blue_foul, $blue_tech_foul, $blue_mob, $blue_auto_gp1High, $blue_auto_gp1Low, $blue_auto_gp2High, $blue_auto_gp2Low, $blue_gp1High, $blue_gp1Low, $blue_gp2High, $blue_gp2Low, $blue_park, $blue_climb, $match_num);
$stmt->execute();


// Update teams
function updateTeam($conn, $team_num, $rp, $auto, $tele, $end) {
    if (empty($team_num)) return;
    $sql = "UPDATE teams SET 
            matches_played = matches_played + 1,
            qualification_score = qualification_score + ?,
            auto_score = auto_score + ?,
            tele_score = tele_score + ?,
            endgame_score = endgame_score + ? 
            WHERE team_num = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiii", $rp, $auto, $tele, $end, $team_num);
    $stmt->execute();
}

updateTeam($conn, $data['red1'] ?? 0, $red_rp, $red_auto, $red_tele, $red_endgame);
updateTeam($conn, $data['red2'] ?? 0, $red_rp, $red_auto, $red_tele, $red_endgame);
updateTeam($conn, $data['red3'] ?? 0, $red_rp, $red_auto, $red_tele, $red_endgame);

updateTeam($conn, $data['blue1'] ?? 0, $blue_rp, $blue_auto, $blue_tele, $blue_endgame);
updateTeam($conn, $data['blue2'] ?? 0, $blue_rp, $blue_auto, $blue_tele, $blue_endgame);
updateTeam($conn, $data['blue3'] ?? 0, $blue_rp, $blue_auto, $blue_tele, $blue_endgame);

// Reset live status
$conn->query("UPDATE status SET score_lock=0, red_confirm=0, blue_confirm=0");

echo json_encode([
    "success" => true, 
    "match" => $match_num, 
    "red_total" => $red_total, 
    "blue_total" => $blue_total
]);

$conn->close();
?>