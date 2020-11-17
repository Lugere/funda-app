<?php
$host = "localhost";
$dbname = "funda_db";
$user = "root";
$pass = "";

function console_log($data)
{
    echo "<script>";
    echo "console.error($data)";
    echo "</script>";
}

try {
    $mysql = new PDO("mysql:host=$host;dbname=$dbname, $user, $pass");
} catch (PDOException $e) {
    console_log("SQL Error: ".$e->getMessage());
    echo "ERROR!";
}
