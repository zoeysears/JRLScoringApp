<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//$sql = "IF EXISTS (SELECT * FROM teams WHERE teamNum = ".$_GET['teamNum'].") BEGIN END ELSE BEGIN ";
$sql = "INSERT INTO teams (team_num,team_name";
$sql .= ") VALUES ('".$_POST["team_num"]."','".$_POST["team_name"]."'";
$sql .= ")";// END";
if($conn->query($sql) == TRUE){
    echo "submit successful ".$sql;
} else {
    echo "error for query: ".$sql;
}
$conn->close();

?>
