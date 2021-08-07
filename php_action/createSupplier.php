<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

	$suppName = $_POST['suppName'];
    $suppStatus = $_POST['suppStatus']; 

	$sql = "INSERT INTO suppliers (supp_name, supp_active, supp_status) VALUES ('$suppName', '$suppStatus', 1)";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Added";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the members";
	}
	 

	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST