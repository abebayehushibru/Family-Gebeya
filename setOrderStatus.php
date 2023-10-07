<?php

if(isset($_COOKIE["familygebeyauser"])){
$dd=$_COOKIE["familygebeyauser"];
$myjsondata= json_decode($dd);

$usertype=$myjsondata->usertype ;
if ( $usertype=="admin") {
    include("connect_database.php");
    $ordersStatus=$_POST["ordersStatus"];
    $orderId=$_POST["orderId"];
    $sql="UPDATE  orders SET ordersStatus='$ordersStatus' WHERE orderId=' $orderId'";
  
    $result= $conn->query($sql);
      if ($result) {
    
echo json_encode( "true");

}
else {
    echo json_encode( "false");
}
} 
}
else{echo json_encode( "login");}