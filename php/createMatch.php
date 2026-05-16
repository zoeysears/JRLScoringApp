<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO matches (match_num, red1, red2, red3, blue1, blue2, blue3) VALUES ("
    .$_POST["match_num"]
    .", ".$_POST["red1"]
    .", ".$_POST["red2"]
    .", ".$_POST["red3"]
    .", ".$_POST["blue1"]
    .", ".$_POST["blue2"]
    .", ".$_POST["blue3"]
    .")";

if($conn->query($sql) == TRUE){
  echo "submit successful";
} else {
  echo "error for query: ".$sql;
}

$conn->close();

?>
