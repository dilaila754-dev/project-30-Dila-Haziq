<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: auth.php");
    exit();
}
?>

<h1>IKM Lumut Smart Map Dashboard</h1>
<a href="about.php">About Us</a>
<a href="logout.php">Logout</a>
