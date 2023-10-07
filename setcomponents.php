<?PHP
$option=$_POST["option"];
$usertype="";

switch ($option) {
    case '1':
       setmenubars() ;
        break;
    case '2':
        setviewmenu();
        break;
    case '3':
        setdisplaymessage();
        break;
        case '4':
            setbottommennu();
            break;
            case '5':
                setcartbutton();
                break;
           
}
 function setmenubars()
{ include("connect_database.php");
    
    $myjsondata= new stdClass;
    $usertype="";
    $newMessage;

    if(isset($_COOKIE["familygebeyauser"])){
    $dd=$_COOKIE["familygebeyauser"];
    $myjsondata= json_decode($dd);
    $userId=$myjsondata->id;
    $sql="SELECT Count(messageId) FROM messages where messageTo = $userId and messsagestatus='new'";
    $mels= $conn->query($sql)->fetch_assoc();
    $result = $mels["Count(messageId)"];
    
  
    if ($result>5) {
        $result=5;
        }
    if( $result!=0) {
            $result= ' <sup
            style="background-color: #f26522; height: 30px; width: 30px ; border-radius: 50%; padding: 5px;">+'.$result.'</sup>';
        }
        else{
         $result= null;
        }
       
    $usertype=$myjsondata->usertype ;}
    echo ' <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
     <a href="index.html"> <i class="fa fa-home"></i> Home</a>
     <a href="#select_catagory" onclick="closeNav()"><i class="fa fa-list-alt"></i> Catagories</a>';


     if ($usertype=="admin") {
       echo ('    <a href="products.html"><i class="fa fa-product-hunt"></i> Products</a>
       <a href="orders.html"> <i class="fa fa-shopping-cart"></i> Orders</a>
       <a href="user.html"><i class="fa fa-user m-lg-1"></i> Peoples</a>
       <a href="adminmassage.html"> <i class="fa fa-comment"></i> Message');

          echo  "$result </a>";
     }
     elseif ($usertype=="user"){
        echo ('<a href="myorder.html"> <i class="fa fa-shopping-cart"></i> My Orders</a>
        <a href="massage.html"> <i class="fa fa-comment"></i> Message ');
       
       
        echo  "$result </a>";
     
     }

     echo ('<a href="about.php"> <i class="fa fa-info-circle"></i> About</a>
     <a href="#Contact"> <i class="fa fa-phone"></i> Contact</a>');

     if (!($usertype=="")) {
        echo ('<a href="log_out.php" id="log_out"><i class="fa fa-sign-out"></i> Log-Out</a>');
     
     } else {
        echo('<a href="login.html"><i class="fa fa-sign-in"></i> Log-In</a>');
     }
     
}
 function setviewmenu()
{$myjsondata= new stdClass;
if(isset($_COOKIE["familygebeyauser"])){


    $dd=$_COOKIE["familygebeyauser"];
    $myjsondata= json_decode($dd);
    
  
    $usertype=$myjsondata->usertype ;
if ($usertype=="admin") {
    echo '  <ul>
    <li><a href="orders.html">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          <span class="padding_10">Orders</span></a>
    </li>

    <li><a href="products.html">
          <i class="fa  fa-product-hunt" aria-hidden="true"></i>
          <span class="padding_10"> Products</span></a>
    </li>

 </ul>';
}
else {
    echo '  <ul>
    <li><a href="myorder.html">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          <span class="padding_10">My order</span></a>
    </li>

    <li><a href="whishlist.html">
          <i class="fa fa-heart" aria-hidden="true"></i>
          <span class="padding_10">my wish lists</span></a>
    </li>

 </ul>';
   
  
  }}
else {
    echo '  <ul>
    
      <li><a href="login.html"><i class="fa fa-sign-in"></i> </i>
            <span class="padding_10">Log In</span></a>
      </li>
  
      <li><a href="registration.html">
            <i class="fa fa-registered" aria-hidden="true"></i>
            <span class="padding_10">Register</span></a>
      </li>
  
   </ul>';
  
}
}
 function setdisplaymessage()
{
    if(isset($_COOKIE["familygebeyauser"])){
echo "true";
}

else {
    echo "false";
}}
function setbottommennu(){
   echo ' <ul>
    <li><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
    <li><a href="#select_catagory"><i class="fa fa-list"></i> Catagories </a></li>';
    if(isset($_COOKIE["familygebeyauser"])){


        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        
      
        $usertype=$myjsondata->usertype ;
        
    if ($usertype=="admin") {
       echo ' <li><a href="orders.html"><i class="fa fa-shopping-cart"></i> Orders</a></li>
       <script type="text/javascript"> deletecartbtn ();</script>
       ';
    }
       else {
        echo  ' <li><a href="whishlist.html"><i class="fa fa-heart"></i> Wish-lists</a></li>
        <li><a href="myorder.html"><i class="fa fa-shopping-cart"></i> My order</a></li>
    ';
        
       }
    echo '<li><a href="log_out.php" id="log_out"><i class="fa fa-sign-out"></i> Log-Out</a>

</li>';
    }
       else {
        echo '<li><a href="login.html"><i class="fa fa-sign-in"></i> Log In</a> </i>
        
  </li>';
       }
  echo '
    <li><a href="#"><i class="fa fa-back-f"></i> Back to Top</a></li>

 </ul>';
}

function setcartbutton(){
    if(isset($_COOKIE["familygebeyauser"])){


        $dd=$_COOKIE["familygebeyauser"];
        $myjsondata= json_decode($dd);
        
      
        $usertype=$myjsondata->usertype ;
        
    if ($usertype!="admin") {
    echo ' <div class="cartbut">
    <a href="cart.html">
       Cart
    </a>
 </div><script>    window.onscroll = function () {
    closeNav();
    if (currentscrolbody + 60 <= document.documentElement.scrollTop) {
       document.querySelector(".cartbut").style.top = "105%";
       currentscrolbody = document.documentElement.scrollTop

    }
    else if (currentscrolbody - 60 >= document.documentElement.scrollTop) {
       document.querySelector(".cartbut").style.top = "85%";

       currentscrolbody = document.documentElement.scrollTop

    }

 }</script> 
';
}}
else
{
    echo ' <div class="cartbut">
    <a href="cart.html">
       Cart
    </a>
 </div>
 
';
}}