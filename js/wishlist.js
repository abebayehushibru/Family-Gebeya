
setproduct() 

async function setproduct() {
    var x = document.querySelector(".favlist");
    let formdata = new FormData();
    formdata.append("option", 1)
    var response = await fetch('productprocess.php', { method: "POST", body: formdata })
    allproduct = await response.json();
    var old_fav_array = getcookies("familygebeyafavroite").split(",");
    var count=0;

    for (index = 0; index < allproduct.length && index < 30; index++) {
        element = allproduct[index];
      
        
        var productid=element.proId;
        if (old_fav_array.includes(productid) == true) {
         

       
        var div = document.createElement("div")
        div.setAttribute("class", "col col")
        var productItem ='<div class="box_main d-flex"><div class="pro_img"><img src="'+element.proPhoto+'"></div><div class="discrpro"> <h4 class="shirt_text">'+element.prodName+'</h4><h6 class="model_text">'+element.proModel+'</h6><p class="price_text">Price  <span style="color: #262626;"> '+element.proPrice+' Birr</span></p></div><div class=" fav_btdiv"> <input type="hidden" name="id_of_prod" id="id_of_prod" class="fav_product" value="'+element.proId+'"><div class="buy_bt"><button class="dft_crt_btn" id="setcart">+ Cart</button></div><div class="fav_bt"><a id="star">&times;</a></div></div></div>'
      
      
      div.innerHTML = productItem;

        x.appendChild(div);
count++;
      
    } }
    if(count==0){
      var p2 = document.createElement("p") 
      var creatediv = document.createElement("div") 
      p2.setAttribute("class", "text-info text-center font-italic font-bold")
      p2.textContent ="You haven't wishlist yet!!"
      creatediv.appendChild(p2)
      x.appendChild(creatediv)
    }
    else{


      forclick();
    }
 


}

function forclick(){
var allstar = document.querySelectorAll("#star")
allstar.forEach(element => {
element.addEventListener("click",function () {
deletfromfav(element)
})
});
var alladdcart = document.querySelectorAll("#setcart")
alladdcart.forEach(element => {
element.addEventListener("click",function () {

managecartbt(element)
})
});
}

   /// tp manage cart 

   function managecartbt(obj) {

var product = returnparent(obj, 2)

var  productid = product.querySelector("input").getAttribute("value")
var old_cart = getcookies("familygebeyacart")
var old_cart_array = getcookies("familygebeyacart").split(",")



if (obj.getAttribute("class") == "dft_crt_btn") {
   obj.innerHTML = "Cart"
   obj.setAttribute("class", "cartbtn")


   product.querySelector("input").classList.add("cart_product")



   var all_pro_id = old_cart
   if (old_cart_array.includes(productid) == false) {
      if (old_cart_array.length != 0) {
         all_pro_id = all_pro_id + "," + productid
      }
      else {
         all_pro_id = productid
      }
   }
   setcookies("familygebeyacart",all_pro_id) 



} else {
   obj.innerHTML = "+ Cart"
   obj.setAttribute("class", "dft_crt_btn")



   product.querySelector("input").classList.remove("cart_product")

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

   setcookies("familygebeyacart",new_cart_array) 

}

}


function deletfromfav(clk_obj) {
var deleteobj=returnparent(clk_obj,3);
console.log(deleteobj.getAttribute("class"))
deleteobj.remove()
managefav(clk_obj)
console.log("deleteobj")
}

function managefav(obj) {
var product = returnparent(obj, 2)

   var old_fav_array = getcookies("familygebeyafavroite").split(",")
 
   var productid= product.querySelector("input").value;

   var new_fav_array = ""
   var no_pro = 0;
   for (let index = 1; index < old_fav_array.length; index++) {

      var element = old_fav_array[index];
      console.log("hello" +element)
      if (element != productid) {
         if (no_pro != 0) {
            new_fav_array = new_fav_array + "," + element
         }
         else {
            new_fav_array = element
         }

         no_pro++;
      }



   }

   setcookies("familygebeyafavroite",new_fav_array)

console.log(new_fav_array+" pt"+productid)

}



