<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$currentMatch = 999;
$sql = "SELECT * FROM status";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $currentMatch = $row['match_num'];
    }
} else {
    echo "could not get current Match";
}

$sql = "SELECT * FROM matches
WHERE match_num='".$currentMatch."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    // output data of each row
    $data = array();
    while($row = $result->fetch_assoc()) {
        array_push($data,$row);
    }
    echo json_encode($data);
} else {
    echo "Error for Query: ".$sql;
}
$conn->close();

?>
