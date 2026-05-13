<?php
header("Content-Type: application/json");

$start = $_GET['start'];
$end   = $_GET['end'];

echo json_encode([
    "start" => $start,
    "end" => $end,
    "message" => "route generated successfully"
]);
?>