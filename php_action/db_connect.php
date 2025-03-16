<?php 	

$localhost = "localhost";
$username = "root";
$password = "";
$dbname = "store";
// $store_url = "http://localhost/php-inventory-management-system/";
$ngrok ="https://2109-202-150-2-130.ngrok-free.app";
$store_url = "$ngrok/php_inventory_management_system_master/";
// db connection
$connect = new mysqli($localhost, $username, $password, $dbname);
// check connection
if($connect->connect_error) {
  die("Connection Failed : " . $connect->connect_error);
} else {
  // echo "Successfully connected";
}

?>