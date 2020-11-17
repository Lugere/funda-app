<?php
require("mysql.php");;

$data = array();
$query = "SELECT * FROM entries ORDER BY createdAt DESC";
$statement = $mysql->prepare($query);
$statement->execute();
while ($row == $statement->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}
echo json_encode($data);
exit;
?>
