<?php
include_once("helperfn.php");
$fullname=$_POST["fullname"];
$phoneNumber=$_POST["phone_number"];

$address=$_POST["address"];
$userid=$_POST["userid"];
$Bankof=$_POST["Bankof"];
$total_cart=$_POST["total_cart"];
$slip_photo =  validate_image( "./images/slips/",$_FILES["slip"]) ;
 
$newnamw= $_FILES["slip"];
$error = NULL;// array();
if ($slip_photo=="./images/productphoto/familyGebeya.jpg"||$slip_photo=="") {
    $error ="wrong file";    
}

$output="";
if (empty($error)) {
    if(isset($_COOKIE["familygebeyauser"])){
        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        $userId=$myjsondata->id; 
        include("connect_database.php");
 
    $stmt = "INSERT INTO orders( orderby, orderedCarts, userid, useraddres, userephone, choosenBank, BankSlip,dates) 
    VALUES ('".$fullname."', '".$total_cart."','".$userId."','". $address."','". $phoneNumber."','". $Bankof."','". $slip_photo."','".date("d-m-Y")."')";
    $result = $conn->query($stmt);
    if ($result){
        $error ="added";
    }
    else{
   $error ="error on inserting";
    }
      $output=$error;
  
}
else{
$output="login";
}
    
      $myjsondata= json_encode($output);
    echo $myjsondata;
}

  
