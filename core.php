<?php 

session_start();

require_once 'db_connect.php';

// echo $_SESSION['userId'];

if(!$_SESSION['userId']) { //$_SESSION is a super global variable
	header('location:'.$store_url);	
} 



?>