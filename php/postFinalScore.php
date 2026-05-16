<?php
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE matches SET ";

foreach ($_POST as $key => $value) {
    if($key != "match_num" 
       && $key != "blue1"
       && $key != "blue2"
       && $key != "blue3"
       && $key != "red1"
       && $key != "red2" 
       && $key != "red3" ) {
        $sql .= $key." = " .$value. ",";
    }
}

$sql .= "score_lock=1, played=1";
//$sql = rtrim($sql, ",");
$sql .= " WHERE match_num=".$_POST['match_num'];

$sql .= ";";
echo $sql;
if($conn->query($sql) == TRUE){
  echo "final score submit successful";
} else {
  echo "error for query: ".$sql;
}

$conn->close();


?>

