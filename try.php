<?php

include("connect_database.php");
$sql="SELECT first_name,last_name,userID,addresses,phone_number  FROM `users` where userID!=1 order by userID desc  LIMIT 70";
 $Arr;  
 $count =0;
$result= $conn->query($sql);
while($row = $result->fetch_assoc()) {
    
    $sql2="SELECT Count(orderId) as sum_order FROM `orders` WHERE userid = ".$row["userID"];
  $result2= $conn->query($sql2);
   $row1 = $result2->fetch_assoc();
        $Arr[$count]=array_merge($row , $row1);
       $count ++;

}
echo json_encode($Arr);
