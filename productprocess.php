<?php

     

            $option=$_POST["option"];
            if (1==$_REQUEST["option"]) {
                get_all_products();
            }else {
                switch ($option) {
                    case '1':
                      get_all_products();
                        break;
                    
                    default:
                      
                        break;
                }
            }
           
     
      
        function get_all_products() {
        include("connect_database.php");
        $sql="SELECT * FROM products order by 	proId desc ";
        $result= $conn->query($sql);
        if ($result->num_rows > 0) {
            $Arr[] = new stdClass;
          
                $count=0;
            
            
            while($row = $result->fetch_assoc()) {
                $Arr[$count]=$row;
                $count++;
            }
            $result2= $conn->query($sql);
        echo json_encode( $Arr);
       
    }
       }

       ?>