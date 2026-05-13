<?php
require "database.php";

if ($_POST['action'] == "login") {

    $u = $_POST['user'];
    $p = $_POST['pass'];

    $q = $conn->query("SELECT * FROM users WHERE username='$u'");

    if ($q->num_rows > 0) {
        $data = $q->fetch_assoc();

        if (password_verify($p, $data['password'])) {
            $_SESSION['user'] = $u;
            echo "login_success";
        } else {
            echo "wrong_password";
        }
    } else {
        echo "user_not_found";
    }
}

if ($_POST['action'] == "signup") {

    $u = $_POST['user'];
    $p = password_hash($_POST['pass'], PASSWORD_DEFAULT);

    $conn->query("INSERT INTO users(username,password) VALUES('$u','$p')");

    echo "signup_success";
}
?>