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


if ($currentMatch != 999){
  $sql = "UPDATE status
  SET currentMatch=".$_POST['match_num'].
  "WHERE match_num=".$currentMatch;
  if($conn->query($sql) == TRUE){
      echo "submit successful";
  } else {
      echo "error for query: ".$sql;
  }
}
$conn->close();

?>
