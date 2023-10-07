
var opr = 0

var clickedcart
var isforcart = false


document.querySelector("#cancel").addEventListener("click", function () {

document.querySelector(".popnotification").style.display = "none";

    
    // opr = -1;

   //if (isforcart == false) {
    //  ordernow()
      
  // } else {
   //   deletecart()
  // }*/
})
document.querySelector("#ok").addEventListener("click", function () {
   opr = 1
   if (isforcart == false) {
      ordernow()
   } else {
      deletecart()
   }

})



document.querySelector(".order_btn").addEventListener("click", function () {
   document.querySelector("#pop_massage").textContent = "Do you want purchase this products"
   document.querySelector(".popnotification").style.display = "flex";
})



function deletecart() {
   if (opr == 1) {
     
      var product = clickedcart.querySelector("#id_of_prod")

      var productid = product.getAttribute("value")
   //   var old_cart = getcookies("familygebeyacart")
      var old_cart_array = getcookies("familygebeyacart").split(",")

      product.classList.remove("cart_product")

      var new_cart_array = ""
      var no_pro = 0;
      for (let index = 0; index < old_cart_array.length; index++) {

         var element = old_cart_array[index];
         if (element != productid) {
            if (no_pro != 0) {
               new_cart_array = new_cart_array + "," + element
            }
            else {
               new_cart_array = element
            }

            no_pro++;
         }



      }

      setcookies("familygebeyacart", new_cart_array)

   }
   clickedcart.remove();
   document.querySelector(".popnotification").style.display = "none";
   isforcart = false;
   total_number_and_birr()

  
}


function ordernow() {
   if (opr == 1) {
      validateinputs()
   }
   document.querySelector(".popnotification").style.display = "none";
}
window.onclick = function (event) {
   if (event.target == document.querySelector(".popnotification")) {
      document.querySelector(".popnotification").style.display = "none";
   }
}



window.onscroll = function () {
   document.querySelector(".popnotification").style.display = "none";
}


/// allproduct



//set total cart

set_total_cart_valuse()
function set_total_cart_valuse() {
var myjson=""
   var carts= document.querySelectorAll('.box_main');
  
   for (let index = 0; index < carts.length; index++) {
     if (index==0) {
      myjson= "["+  carts[0].querySelectorAll("#id_of_prod")[0].value+","+carts[0].querySelectorAll("#numberofitem")[0].textContent+"]"

     } else {
      myjson= myjson +",["+  carts[index].querySelectorAll("#id_of_prod")[0].value+","+carts[index].querySelectorAll("#numberofitem")[0].textContent+"]"

     }
     
      
   }
document.querySelector("#total_cart").value=myjson
}


 
setproduct()

async function setproduct() {
    var x = document.querySelector(".cartproduct");
    let formdata = new FormData();
    formdata.append("option", 1)
    var response = await fetch('productprocess.php', { method: "POST", body: formdata })
    allproduct = await response.json();
    var old_fav_array = getcookies("familygebeyacart").split(",");
    var count=0;

    for (index = 0; index < allproduct.length && index < 30; index++) {
        element = allproduct[index];
      
        
        var productid=element.proId;
        if (old_fav_array.includes(productid) == true) {
         

       
        var div = document.createElement("div")
        div.setAttribute("class", "col col")
        var productItem ='<div class="box_main d-flex"><div class="pro_img"><img src="'+element.proPhoto+'"></div><div class="discrpro"> <h4 class="shirt_text">'+element.prodName+'</h4><h6 class="model_text">'+element.proModel+'</h6> <p class="price_text"> <span id="minus"> - </span><span id="numberofitem" s>1</span><span id="plus"> + </span></span></p></div><div class="pricediv"><input type="hidden" name="" id="singleprice" value="'+element.proPrice+'"><input type="hidden" name="id_of_prod" id="id_of_prod" class="cart_product" value="'+ element.proId+'"><p class="price_text"> Price <span style="color: #262626;" id="price"> '+element.proPrice+' </span><span>Birr</span></p><div class="fav_bt"><a id="clearcart">&times;</a></div></div></div>'
      
      
      div.innerHTML = productItem;

        x.appendChild(div);
count++;
      
    } }
    if(count==0){
      var p2 = document.createElement("p") 
      var creatediv = document.createElement("div") 
      p2.setAttribute("class", "text-info text-center font-italic font-bold")
      p2.textContent ="You haven't cart yet!!"
      creatediv.appendChild(p2)
      x.appendChild(creatediv)
    }
    else{
      total_number_and_birr()

      forclick();
    }
 


}


function forclick(){


var allclearcartbtn = document.querySelectorAll("#clearcart");
allclearcartbtn.forEach(element => {
   element.addEventListener("click", function () {
      setcart(element)
    
   })
});
var allminusbnt = document.querySelectorAll("#minus");
allminusbnt.forEach(element => {
   element.addEventListener("click", function () {
      setnumberofitem(-1, this)
   })
});
var allplusbtn = document.querySelectorAll("#plus");
allplusbtn.forEach(element => {
   element.addEventListener("click", function () {
      setnumberofitem(1, this)
   })
});

}
function setcart(clk_obj) {
 
   document.querySelector("#pop_massage").textContent = "do you want to delete an Item"
   document.querySelector(".popnotification").style.display = "flex";
   isforcart = true;
   clickedcart = returnparent(clk_obj, 4)
   

}

function setnumberofitem(operation, clkobj) {
   var setobj_parent = returnparent(clkobj, 3)
   var setobj = setobj_parent.querySelector(".pricediv");
   if (clkobj.parentElement.querySelector("#numberofitem").textContent == 1 && operation == -1) {
      clkobj.parentElement.querySelector("#minus").style.visibility = "hidden"
   }
   else {
      clkobj.parentElement.querySelector("#minus").style.visibility = "visible"
      if (operation == -1) {
         clkobj.parentElement.querySelector("#numberofitem").textContent = Number(clkobj.parentElement.querySelector("#numberofitem").textContent) - 1
      }
      if (operation == 1) {
         clkobj.parentElement.querySelector("#numberofitem").textContent = Number(clkobj.parentElement.querySelector("#numberofitem").textContent) + 1
      }
      if (clkobj.parentElement.querySelector("#numberofitem").textContent == 1) {
         clkobj.parentElement.querySelector("#minus").style.visibility = "hidden"
      }
      setobj.querySelector("input").value
      setobj.querySelector(".price_text").querySelector("span").textContent = Number(setobj.querySelector("input").value) * Number(clkobj.parentElement.querySelector("#numberofitem").textContent)
   }
   total_number_and_birr()
}

function total_number_and_birr() {
   
   var myelement = document.querySelectorAll("#numberofitem");
   var priceElement = document.querySelectorAll("#price");
   var total_number = 0
   var total_birr = 0;
   myelement.forEach(element => {
      total_number = total_number + Number(element.textContent)

   });
   priceElement.forEach(element => {
      total_birr = total_birr + Number(element.textContent)
   
   });
  
   document.querySelector("#totalnumber").textContent = total_number
   document.querySelector("#totalprice").textContent = total_birr
   set_total_cart_valuse()
}


document.querySelector("#slip").addEventListener("change",function(){

   var file = document.querySelector("#slip").files[0]
   console.log(file);
})




/* validation function*/
async function validateinputs() {
document.querySelector(".order_btn").style.display="none"
   var errorm = ""
   var fullnameid = document.querySelector("#fullname").value;
      var phonenumber = document.querySelector("#phone_number").value;
   var addressid = document.querySelector("#address").value
   var slipid = document.querySelector("#slip")
   var bank_catagory= document.querySelector("#bank_catagory")
   var errormsg = document.querySelector(".errormsg");
 
   let regnum = /^0+[7,9]+[0-9]{8}$/;
   let regnum1 = /^[+]251+[79][0-9]{8}$/;
   let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;

   if (fullnameid == "") {
      errorm = "You forget entering firstname name";

   }
   else if (phonenumber == "") {
      errorm = " You forget entering phone number";

   }
   else if (!(regnum.test(phonenumber) || regnum1.test(phonenumber))) {

      errorm = "PLEASE Enter correct phone number";

   }
   else if (addressid== "") {

      errorm = " you forget entering address";

   }
   
   else if (slipid.value=="") {
      errorm = " You forget entering slip";

   }
   else if (bank_catagory.value=="") {
      errorm = " You forget bank option";

   }
 
 
   if (errorm != "") {
   document.querySelector(".order_btn").style.display ="flex";
      errormsg.innerHTML = " <span style=\"color:red; font-size:18pxl\">" + errorm +" </span>";

   }
   else {
      var userid = ""
     let formdata= new FormData();
    formdata.append("fullname",fullname.value)
      formdata.append("phone_number",phone_number.value)
      
      formdata.append("address",address.value)
      formdata.append("userid",userid.value)
      formdata.append("Bankof",bank_catagory.value)
    
       formdata.append("total_cart",total_cart.value)
      formdata.append("slip",slip.files[0])
      var response=await fetch('addcart.php',{ method:"POST",body:formdata })
      const json = await response.json();
     
      if(json=="added"){
         errormsg.innerHTML = " <span style=\"color:green; font-weight:bold;font-size:18px;text-transform:capitalized;\"> added successfuly! </span>";     
         setcookies("familygebeyacart", "");
         document.querySelector(".cartproduct").innerHTML="";
         total_number_and_birr();
      
      }
      else if(json=="login"){
      window.location.assign("./login.html")
      }
      else{
        document.querySelector(".order_btn").style.display ="flex";
            errormsg.innerHTML = " <span style=\"color:red; font-weight:bold;font-size:18px;text-transform:capitalized;\">error has occurred \n please try again </span>";     
         
      }
      
     
    
/*
     

*/
   }
}



