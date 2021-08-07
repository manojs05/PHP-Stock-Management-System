<?php 	

require_once 'core.php';

$valid['success'] = array('success' => false, 'messages' => array());

if($_POST) {	

  $suppName = $_POST['editSuppName'];
  //$suppEmail = $_POST['editSuppEmail'];
  $suppStatus = $_POST['editSuppStatus']; 
  $suppId = $_POST['suppId'];

	$sql = "UPDATE suppliers SET supp_name = '$suppName', supp_active = '$suppStatus' WHERE supp_id = '$suppId'";

	if($connect->query($sql) === TRUE) {
	 	$valid['success'] = true;
		$valid['messages'] = "Successfully Updated";	
	} else {
	 	$valid['success'] = false;
	 	$valid['messages'] = "Error while adding the members";
	}
	 
	$connect->close();

	echo json_encode($valid);
 
} // /if $_POST