<?php 
  if(isset($_COOKIE["familygebeyauser"])){
        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        $userId=$myjsondata->id;  

        $usertype=$myjsondata->usertype ;
        if ( $usertype=="admin") {  
include_once("helperfn.php");
$prodName=json_decode($_POST["prodName"]);
 $proModel=json_decode($_POST["proModels"]);
 $proPrice=json_decode($_POST["proPrices"]);
$proCatagory=json_decode($_POST["proCatagories"]);



$pronames=$prodName->proNames;
$promodels=$proModel->proModels;
$proprices=$proPrice->proPrices;
$procat=$proCatagory->proCatagories;



$stmt="INSERT INTO products (prodName,proModel,proPrice,proPhoto,proCatagory)VALUES ";
$errorm= "";
$y="";
for ($i=0; $i < count($pronames); $i++) { 
    $image="photo$i";
   
$image=validate_image( "./images/productphoto/",$_FILES["photo$i"]);
$y=$y.$image;
if ($image=="") {
    $errorm='wrong file <br> file must be  < jpg", "png", "jpeg", "gif" on >'." $i+1 product file";
    break;
 
}else {
 $delm=",";
 if ($i==0) {
    $delm="";
 }
    $stmt =  $stmt. "$delm ('".$pronames[$i]."', '".$promodels[$i]."','".$proprices[$i]."',' $image','".$procat[$i]."')";

}
   
}
include("connect_database.php");

$result= $conn->query($stmt);
if ($result==true) {
    $my_output ="true";
}
else {
    $my_output ="error when inserting to data base";
}
$sent_output =json_encode($my_output);
echo($sent_output);

}}

// function validate_image( $path,$files )
// {

//     $target = $path;

//     $default = "familyGebeya.jpg";
//     $filename = basename($path);
 
//     $targetpath = $target . $filename;
    
//     $filetype =  strtolower( pathinfo($targetpath, PATHINFO_EXTENSION));
//     if(!empty($filename)){
//         $allowtype = array("jpg", "png", "jpeg", "gif");
//         if(in_array( $filetype, $allowtype)){
//             if (move_uploaded_file($path, $targetpath)) {
//                 return $targetpath;
//              }
     
//         } else
//             return '';
//     }
  
//     return $path . $default;

