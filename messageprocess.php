<?php
$option=$_POST["option"];


switch ($option) {
    case '1':
       get_message_for_user() ;
        break;
    case '2':
        getusersnmae();
        break;
    case '3':
        get_message_for_admin() ;
        break;
    case '4':
            save_message() ;
            break;
    case '5':
                get_message_all_name_for_admin() ;
                break;
    
    }
    function get_message_for_user()
    {
        include("connect_database.php");
    
        $myjsondata= new stdClass;
        $usertype="";
      
    
        if(isset($_COOKIE["familygebeyauser"])){
        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        $userId=$myjsondata->id;  

        $usertype=$myjsondata->usertype ;
        if ( $usertype=="admin") {
        $messagewith=$_POST["messagewith"];
        $sql="SELECT * FROM messages where ( messageFrom= $userId AND messageTo = $messagewith) or (messageFrom= $messagewith AND messageTo =$userId)  LIMIT 70";
        $sql2="UPDATE messages SET messsagestatus='' where ((messageFrom= $messagewith AND messageTo =$userId )AND messsagestatus='new')";
        } else {
        $sql="SELECT * FROM messages where messageFrom=$userId OR messageTo = $userId LIMIT 70";
        $sql2="UPDATE messages SET messsagestatus='' where (messageFrom=1  AND messsagestatus='new')";
        }
        
        $result= $conn->query($sql);
        if ($result->num_rows > 0) {
            $Arr[] = new stdClass;
          
                $Arr[0]->userId="$userId";
                $count=1;
            
            
            while($row = $result->fetch_assoc()) {
                $Arr[$count]=$row;
                $count++;
            }
            $result2= $conn->query($sql2);
        echo json_encode( $Arr);
       
    }}

    else {
        header("location:login.html");
    }


}

function     save_message()
{
    include("connect_database.php");
    
        $myjsondata= new stdClass;
        $usertype="";
      $message=$_POST["message"];
    $message_to;
        if(isset($_COOKIE["familygebeyauser"])){
        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        $userId=$myjsondata->id;
         
    $usertype=$myjsondata->usertype ;
    if ($usertype=="admin") {
    
        $message_to=$_POST["messagewith"];

        }
        else{
            $message_to=1;
        }
        $sql="INSERT INTO messages  (messageContent,messageSenderId,messageFrom,messageTo,dates) VALUES('$message', $userId,$userId,$message_to, now())";
        $result= $conn->query($sql);
        if ($result) {
        echo json_encode("true");
    }
    else{
        echo json_encode("false");
    }
}
else {
     header("location:login.html");
}
}

function get_message_all_name_for_admin() {
  
    include("connect_database.php");
    
        $myjsondata= new stdClass;
        $usertype=""; 
        if(isset($_COOKIE["familygebeyauser"])){
            $sql="SELECT  messageSenderId FROM messages   ORDER by messageId asc"; 
            $result= $conn->query($sql);
        if ($result->num_rows > 0) {
            $Arr[] = new stdClass;    
            $count=0;
            while($row = $result->fetch_assoc()) {
                if ($row ["messageSenderId"]!=1) {
                    # code...
                
                $sql2="SELECT  first_name,last_name FROM users where  userID=".$row ["messageSenderId"]; 
                $result2= $conn->query($sql2);
                $row2 = $result2->fetch_assoc();
                $Arr[$count]=array_merge($row,$row2);
                $count++;}
            }
        
        echo json_encode($Arr);
    }
        
        } 
         else {
            header("location:login.html");
         }
}