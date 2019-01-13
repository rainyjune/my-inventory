<?php
$jsonResult = array(
  "status" => "error",
  "msg" => "unknown error"
);
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
if (isset($_POST['name']) && isset($_POST['quantity']) && isset($_POST['price'])) {
  $id = isset($_POST['id']) ? $_POST['id'] : 0;
  $name = $_POST['name'];
  $quantity = $_POST['quantity'];
  $price = $_POST['price'];
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

$sql = "REPLACE INTO items (id, name, quantity, price) VALUES ('".$mysqli->real_escape_string($id)."', '".$mysqli->real_escape_string($name)."', '".$mysqli->real_escape_string($quantity)."', '".$mysqli->real_escape_string($price)."')";
//die($sql);

if (!$result = $mysqli->query($sql)) {
  $jsonResult["msg"] = $mysqli->error." ".$sql;
  die(json_encode($jsonResult));
}

// Phew, we made it. We know our MySQL connection and query 
// succeeded, but do we have a result?
if ($mysqli->affected_rows === 0) {
  $jsonResult["msg"] = "Insert failed. Please try again.";
  die(json_encode($jsonResult));
}

$sqlcount = "SELECT COUNT(1) AS total FROM items";
$resultcount = $mysqli->query($sqlcount);

$jsonResult["status"] = "ok";
$jsonResult["msg"] = $resultcount->fetch_assoc();
echo json_encode($jsonResult);

// The script will automatically free the result and close the MySQL
// connection when it exits, but let's just do it anyways
$mysqli->close();