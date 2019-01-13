<?php
$jsonResult = array(
  "status" => "error",
  "msg" => "unknown error"
);
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
if (isset($_POST['id'])) {
  $id = $_POST['id'];
} else {
  $jsonResult['msg'] = "Parameters missing.";
  die(json_encode($jsonResult));
}
// Connecting to and selecting a MySQL database named tripadvisor
// Hostname: 127.0.0.1, username: your_user, password: your_pass, db: tripadvisor
include 'config.php';
$mysqli = @new mysqli($db_host, $db_user, $db_pass, $db_name);

// Oh no! A connect_errno exists so the connection attempt failed!
if ($mysqli->connect_errno) {
  $jsonResult["msg"] = $mysqli->connect_error;
  die(json_encode($jsonResult));
}

// Perform an SQL query

$sql = "DELETE FROM items WHERE id='".$mysqli->real_escape_string($id)."'";

if (!$result = $mysqli->query($sql)) {
  $jsonResult["msg"] = $mysqli->error." ".$sql;
  die(json_encode($jsonResult));
}

// Phew, we made it. We know our MySQL connection and query 
// succeeded, but do we have a result?
if ($mysqli->affected_rows === 0) {
  $jsonResult["msg"] = "Remove failed. Please try again.";
  die(json_encode($jsonResult));
}

$jsonResult["status"] = "ok";
$jsonResult["msg"] = 'ok';
echo json_encode($jsonResult);

// The script will automatically free the result and close the MySQL
// connection when it exits, but let's just do it anyways
$mysqli->close();