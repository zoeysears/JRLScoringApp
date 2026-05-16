<?php

//credentials
include "databaseHelper.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname,3306);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//SQL query
$sql = "SELECT * FROM status";

//run query
$result = $conn->query($sql);

//check to make sure we got a response
if ($result->num_rows > 0) {
    // get the first row of data
    $row = $result->fetch_assoc();
    
    //encode the first row in JSON
    echo json_encode($row);
} else {
    //inform us of failure
    echo "could not get current Status";
}

$conn->close();

?>
