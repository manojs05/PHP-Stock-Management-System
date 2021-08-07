<?php 	

require_once 'core.php';

$suppId = $_POST['suppId'];

$sql = "SELECT supp_id, supp_name, supp_active, supp_status FROM suppliers WHERE supp_id = $suppId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);