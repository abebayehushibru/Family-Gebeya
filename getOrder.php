<?php

include("connect_database.php");
    
$myjsondata= new stdClass;
$usertype="";


if(isset($_COOKIE["familygebeyauser"])){
$dd=$_COOKIE["familygebeyauser"];
$myjsondata= json_decode($dd);
$userId=$myjsondata->id;  

$usertype=$myjsondata->usertype ;
if ( $usertype=="admin") {

$sql="SELECT * FROM `orders`  order by orderId desc";
} else {
$sql="SELECT * FROM `orders`WHERE userid = $userId order by orderId desc;";
}

$result= $conn->query($sql);
if ($result->num_rows > 0) {
    $Arr[] = new stdClass;
        $count=0; 
    while($row = $result->fetch_assoc()) {
        $Arr[$count]=$row;
        $count++;
    }
  
echo json_encode( $Arr);

}}