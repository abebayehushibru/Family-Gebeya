<?php

$my_output='';
$phone_number=$_POST["phone_number"];
$option=$_POST["option"];
$my_output="";
switch ($option) {
    case '1':
      {  login();
        break;}
    case '2':
        forget();
        break;
    case '3':
       change();
        break;

};
 function login()
{include("connect_database.php");
    $phone_number=$_POST["phone_number"];
    $Password=$_POST["Password"]; 
    $sql="SELECT * FROM users where phone_number='$phone_number'";
    $result= $conn->query($sql);
    if ($result->num_rows > 0) {
        
        while($row = $result->fetch_assoc()) {
            if (password_verify($Password,$row["Passwords"])) {
                
                // 
                
                $myobj=  new stdClass;
                $myobj -> id=$row["userID"];
                $myobj->Name=$row["first_name"]." " .$row["last_name"];
                $myobj->phone_number=$row["phone_number"];
                $myobj->addresses=$row["addresses"];
                $myobj->usertype= $row["usertype"];
            //     $myobj ="id".$row["userID"].",first_name ".$row["first_name"].", 
            //     last_name ". $row["last_name"].",phone_number". $row["phone_number"].",addresses ".$row["addresses"]
            //    .", usertype".$row["usertype"];
                 
                // $myobj = array( "id"=> $row["userID"],"first_name "=> $row["first_name"], 
                //     "last_name "=> $row["last_name"], "phone_number" => $row["phone_number"], "addresses "=>  $row["addresses"]
                //    , "usertype" =>$row["usertype"]);
                $cookies_value=json_encode($myobj);
               setcookie("familygebeyauser",$cookies_value,time()+(180*86400),"/");
               $my_output= "true";
            } else {
                $my_output= "wrong password";
            }
            
        }
    } else {
        $my_output= "wrong phone number";
    }
   

    $sent_output = json_encode($my_output);
    echo($sent_output);
}
 function forget()
{   include("connect_database.php");
     $g ="";
    
    $phone_number=$_POST["phone_number"];
    $favorite=$_POST["favorite"];
    $sql="SELECT userID FROM users where phone_number='$phone_number' AND favorite='$favorite'";
    $result= $conn->query($sql);
    if ($result->num_rows > 0) {
    $g = json_encode("true");}
    else {
        $g = json_encode("false");
    }
    echo($g);
}
 function change()
{ 
    include("connect_database.php");$g ="";
      $phone_number=$_POST["phone_number"];
    $newpassword=password_hash($_POST["Password"],PASSWORD_DEFAULT);
    $sql="UPDATE   users SET Passwords ='$newpassword' where phone_number='$phone_number'";
    $result= $conn->query($sql);
    
    if ($result) {
    $g = json_encode("true");}
    else {
        $g = json_encode("false");
    }
    echo($g);
}



