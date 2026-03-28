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
    echo $key;
    echo $value;
    if($key != "match_num" ) {
        $sql .= $key." = " .$value. ",";
    }
}

$sql = rtrim($sql, ",");
$sql .= " WHERE match_num=".$_POST['match_num'];

$sql .= ";";
echo $sql;
if($conn->query($sql) == TRUE){
  echo "submit successful";
} else {
  echo "error for query: ".$sql;
}

$conn->close();


?>
