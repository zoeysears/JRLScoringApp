<?php
include "databaseHelper.php";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if($_POST['delete']==TRUE){
  $sql = "DELETE FROM teams" ;
  if($conn->query($sql) == TRUE){
      echo "submit successful ".$sql;
  } else {
      echo "error for query: ".$sql;
  }
}
$conn->close();

?>
