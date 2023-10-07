<?php
  if(isset($_COOKIE["familygebeyauser"])){
        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        

        $usertype=$myjsondata->usertype ;
        if ( $usertype=="admin") {
$option=$_POST["option"];

    switch ($option) {
        case '1':
            updateproduct();
            break;
      case '2':
                deleteproducts();
                  break;
        
        default:
          
            break;
    
}
}

} 
 function updateproduct()
{
    include_once("helperfn.php");
    $prodName=$_POST["prodName"];
    $proModels=$_POST["proModels"];
    $proPrices=$_POST["proPrices"];
    $setToId=$_POST["setToId"];  
    $issetphoto=$_POST["issetphoto"];
    $image;
    if (  $issetphoto=="true") {
        $image=validate_image( "./images/productphoto/",$_FILES["newphoto"]);
  
    }
    else {
        $image=$_POST["newphoto"];
    }
   

    $stmt="UPDATE  products SET prodName='$prodName',proModel='$proModels',proPrice='$proPrices',proPhoto='$image' WHERE proId= $setToId";
    include("connect_database.php");

    $result= $conn->query($stmt);
    $conn->close();
    if ($result==true) {
        $my_output ="true";
    }
    else {
        $my_output ="error when inserting to data base";
    }
    $sent_output =json_encode($my_output);
    echo($sent_output);
}
function deleteproducts()
{
    $deleteprod=$_POST["deleteprod"]; 
    $stmt="DELETE  FROM products  WHERE proId= $deleteprod";
    include("connect_database.php");

    $result= $conn->query($stmt);
  
    if ($result==true) {
        $my_output ="true";
    }
    else {
        $my_output ="error when deleting ";
    }
    $sent_output =json_encode($my_output);
    echo($sent_output);
    $conn->close();

}