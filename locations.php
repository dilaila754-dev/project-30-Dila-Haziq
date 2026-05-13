<?php
header("Content-Type: application/json");

echo json_encode([
    "dorm" => "Dormitory",
    "cafe" => "Cafeteria",
    "office" => "Admin Block",
    "library" => "Library",
    "gate" => "Main Gate"
]);
?>