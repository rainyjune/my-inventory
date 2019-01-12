<?php
$jsonResult = array(
  "status" => "error",
  "msg" => "unknown error"
);
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
// Connecting to and selecting a MySQL database named myinventory
// Hostname: 127.0.0.1, username: your_user, password: your_pass, db: myinventory
include 'config.php';
$mysqli = @new mysqli($db_host, $db_user, $db_pass, $db_name);

// Oh no! A connect_errno exists so the connection attempt failed!
if ($mysqli->connect_errno) {
  $jsonResult["msg"] = $mysqli->connect_error;
  die(json_encode($jsonResult));
}

// Perform an SQL query

$sql = "SELECT * FROM items ORDER BY id ASC";

if (!$result = $mysqli->query($sql)) {
  $jsonResult["msg"] = $mysqli->error;
  die(json_encode($jsonResult));
}


$jsonResult["status"] = "ok";
$jsonResult["msg"] = "ok";
$resultArray = array();
while ($items = $result->fetch_assoc()) {
  $resultArray[] = $items;
}
$jsonResult["data"] = $resultArray;

echo json_encode($jsonResult);

// The script will automatically free the result and close the MySQL
// connection when it exits, but let's just do it anyways
$result->free();
$mysqli->close();