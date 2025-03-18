<?php

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if ($_POST) {
	$productId = $_POST['productId'];
	$partNumber = $_POST['editPartNumber'];
	$productName = $_POST['editProductName'];
	$quantity = $_POST['editQuantity'];
	$price = $_POST['editPrice'];
	$brandName = $_POST['editBrandName'];
	$categoryName = $_POST['editCategoryName'];
	$productStatus = $_POST['editProductStatus'];

	echo '<script>console.log('.$productId.')</script>';


	$sql = "UPDATE product SET product_name = '$productName',part_number = '$partNumber', brand_id = '$brandName', categories_id = '$categoryName', quantity = '$quantity', price = '$price', active = '$productStatus', status = 1 WHERE product_id = $productId ";

	if ($connect->query($sql) === TRUE) {
		$valid['success'] = true;
		$valid['messages'] = "Successfully Update";
	} else {
		$valid['success'] = false;
		$valid['messages'] = "Error while updating product info";
	}

} // /$_POST

$connect->close();

echo json_encode($valid);

