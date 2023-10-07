<?php
$first_name=$_POST["first_name"];
$last_name=$_POST["last_name"];
$phone_number=$_POST["phone_number"];
$Password= password_hash($_POST["Password"],PASSWORD_DEFAULT);
$address=$_POST["address"];
$favorite=$_POST["favorite"];
include("connect_database.php");
$sql = "INSERT INTO users (first_name,last_name,phone_number,Passwords,addresses,favorite)
VALUES ('$first_name', '$last_name','$phone_number','$Password','$address','$favorite')";
$result= $conn->query($sql);
if ($result==true) {
    $my_output ="true";
}
else {
    $my_output ="true";
}
$sent_output =json_encode($my_output);
echo($sent_output);

