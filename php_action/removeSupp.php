<?php 	

require_once 'core.php';


$valid['success'] = array('success' => false, 'messages' => array());

$brandId = $_POST['suppId'];

if($suppId) { 

 $sql = "UPDATE suppliers SET supp_status = 2 WHERE supp_id = {$suppId}";

 if($connect->query($sql) === TRUE) {
 	$valid['success'] = true;
	$valid['messages'] = "Successfully Removed";		
 } else {
 	$valid['success'] = false;
 	$valid['messages'] = "Error while remove the supplier";
 }
 
 $connect->close();

 echo json_encode($valid);
 
} // /if $_POST