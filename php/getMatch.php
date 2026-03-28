<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM matches
WHERE match_num='".$_POST["match_num"]."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
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
