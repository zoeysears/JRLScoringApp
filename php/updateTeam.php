<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE teams SET ";

foreach ($_POST as $key => $value) {
    if($key != "team_num" ) {
        $sql .= $key." = " .$value. ",";
    }
}

$sql = rtrim($sql, ",");
$sql .= " WHERE team_num=".$_POST['team_num'];

$sql .= ";";

if($conn->query($sql) == TRUE){
  echo "submit successful";
} else {
  echo "error for query: ".$sql;
}

$conn->close();


?>

