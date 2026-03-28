<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$sql = "SELECT * FROM matches
WHERE red1='".$_POST["team_num"]."'
or red2='".$_POST["team_num"]."'
or red3='".$_POST["team_num"]."'
or blue1='".$_POST["team_num"]."'
or blue2='".$_POST["team_num"]."'
or blue3='".$_POST["team_num"]."'
";

$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // output data of each row
    $data = array();
    while($row = $result->fetch_assoc()) {
        array_push($data,$row);
    }
    echo json_encode($data);
} else {
    echo "0 results for query: ".$sql;
}

$conn->close();

?>
