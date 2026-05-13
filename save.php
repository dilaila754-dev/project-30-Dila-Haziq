<?php
require "database.php";
session_start();

$user = $_SESSION['user'];
$name = $_POST['name'];
$lat  = $_POST['lat'];
$lng  = $_POST['lng'];

$conn->query("INSERT INTO saved_locations(user,name,lat,lng)
VALUES('$user','$name','$lat','$lng')");

echo "saved";
?>