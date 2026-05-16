<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


  $sql = "SELECT team_name FROM teams
  WHERE team_num=".$_POST["team_num"];
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
          echo $row[$_GET['scorePos']];
          break;
      }
  } else {
      echo "0 results for query: ".$sql;
  }

$conn->close();

?>
