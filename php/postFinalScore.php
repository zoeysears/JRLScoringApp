<?php
include "databaseHelper.php";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) die(json_encode(["error" => "DB Connection failed"]));

$data = $_POST;
$match_num = (int)$data['match_num'];

// Scoring multipliers (edit these!)
$scores = [
    'mob' => 5,
    'auto_gp1_high' => 8, 'auto_gp1_low' => 4,
    'auto_gp2_high' => 6, 'auto_gp2_low' => 3,
    'tele_gp1_high' => 5, 'tele_gp1_low' => 2,
    'tele_gp2_high' => 4, 'tele_gp2_low' => 1,
    'park' => 5, 'climb' => 15,
    'foul' => 5, 'tech_foul' => 12
];

function calcAlliance($d, $prefix, $scores) {
    $total = 0;
    $total += ($d[$prefix.'_mob'] ?? 0) * $scores['mob'];
    $total += ($d[$prefix.'_auto_gp1_high'] ?? 0) * $scores['auto_gp1_high'];
    // ... add all other fields similarly
    $total += ($d[$prefix.'_tele_gp1_high'] ?? 0) * $scores['tele_gp1_high'];
    // ... continue for all scoring actions
    $total += ($d[$prefix.'_park'] ?? 0) * $scores['park'];
    $total += ($d[$prefix.'_climb'] ?? 0) * $scores['climb'];
    $total -= ($d[$prefix.'_foul'] ?? 0) * $scores['foul'];
    $total -= ($d[$prefix.'_tech_foul'] ?? 0) * $scores['tech_foul'];
    return $total;
}

$red_total = calcAlliance($data, 'red', $scores);
$blue_total = calcAlliance($data, 'blue', $scores);

$red_rp = ($red_total > $blue_total) ? 2 : ($red_total == $blue_total ? 1 : 0);
$blue_rp = ($blue_total > $red_total) ? 2 : ($red_total == $blue_total ? 1 : 0);

// Update matches
$updateMatch = "UPDATE matches SET played=1, score_lock=1, red_total_points=?, blue_total_points=?, 
    red_quali_points=?, blue_quali_points=? WHERE match_num=?";
$stmt = $conn->prepare($updateMatch);
$stmt->bind_param("iiiii", $red_total, $blue_total, $red_rp, $blue_rp, $match_num);
$stmt->execute();

// Update each team
function updateTeam($conn, $team_num, $rp, $auto=0, $tele=0, $end=0) {
    $sql = "UPDATE teams SET matches_played = matches_played + 1, 
            qualification_score = qualification_score + ?, 
            auto_score = auto_score + ?, tele_score = tele_score + ?, 
            endgame_score = endgame_score + ? WHERE team_num = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiii", $rp, $auto, $tele, $end, $team_num);
    $stmt->execute();
}

updateTeam($conn, $data['red1'], $red_rp /* add auto/tele/end */);
updateTeam($conn, $data['red2'], $red_rp);
updateTeam($conn, $data['red3'], $red_rp);
updateTeam($conn, $data['blue1'], $blue_rp);
updateTeam($conn, $data['blue2'], $blue_rp);
updateTeam($conn, $data['blue3'], $blue_rp);

// Reset status
$conn->query("UPDATE status SET score_lock=0, red_confirm=0, blue_confirm=0");

echo json_encode(["success" => true, "match" => $match_num, "red" => $red_total, "blue" => $blue_total]);
$conn->close();
?>