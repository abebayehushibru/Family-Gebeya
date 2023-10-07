
setmenus("#mySidenav", 1);
async function setmenus(set_to, menuoff) {
   let formdata = new FormData();


   formdata.append("option", menuoff)

   var response = await fetch('setcomponents.php', { method: "POST", body: formdata })
   const mvr = await response.text();
   if (menuoff == 3) {
      if (mvr == "true") {
         var y = document.querySelectorAll("#top_button")
         y.forEach(element => {
            element.style.display = "none";
         });
      }

   } else {
      document.querySelector(set_to).innerHTML = mvr
   }

}


///

var allproduct;
function forclick(from) {
   var allbuy_bt = document.querySelector(from).querySelectorAll(".buy_bt")
   var allfav_bt = document.querySelector(from).querySelectorAll(".fav_bt")

   allbuy_bt.forEach(element => {
      element.querySelector("button").addEventListener("click", function () {
         managecartbt(this)
      })
   });
   allfav_bt.forEach(element => {
      element.querySelector("a").addEventListener("click", function () {
         managefav(this)
      })
   });
   
   return ;}
getmessages()
async function getmessages() {

   let formdata = new FormData();
   formdata.append("option", 1)
   var response = await fetch('productprocess.php', { method: "POST", body: formdata })
   allproduct = await response.json();

}




document.querySelector("#select_catagory").addEventListener("change", setproductcatagory);
async function setproductcatagory() {
   var x = document.querySelector(".catagory");
  
   var count = 1;
   var listdiv = ""
   var cx = document.querySelector(".catagory").clientWidth
   var product_catagory = document.querySelector("#select_catagory").value;
   var round = 0;
   
   document.querySelector(".catagory").innerHTML = ""

   for (index = 0; index < allproduct.length && index < 30; index++) {
      element = allproduct[index];

      if (product_catagory != "all" && element.proCatagory != product_catagory) {


         continue;
      }


      if (cx < 575) {
         count = 3
      }
      listdiv = listdiv + ' <div class="col-lg-4 col-sm-4"><div class="box_main"><h4 class="shirt_text">' + element.prodName + '</h4><h6 class="model_text">' + element.proModel + '</h6><p class="price_text">Price :  <span style="color: #262626;"> ' + element.proPrice + '  Birr </span></p> <div class="tshirt_img"><img src="' + element.proPhoto + '"></div><div class="btn_main"><input type="hidden" name="id_of_prod" id="id_of_prod" value="' + element.proId + '"> <div class="buy_bt">' + iscart(element.proId) + '</div><div class="fav_bt">' + isfav(element.proId) + '</div></div></div></div>'


      if (count == 3) {

         var rowstart = '  <div class="container"><div class="fashion_section_2"><div class="row">'
         var rowend = " </div></div></div>";
         var creatediv = document.createElement("div")
         creatediv.setAttribute("class", "carousel-item")
         if (round == 0) {
            creatediv.classList.add("active")
            round = 1

         }
         creatediv.innerHTML = rowstart + listdiv + rowend;
         count = 0;

         x.appendChild(creatediv);

         listdiv = ""


      }

      count++;





   }

   forclick(".catagory")
}

async function setproduct() {
   var x = document.querySelector(".recent_product");
   
   var count = 1;
   var listdiv = ""
   var round = 0;
   var cx = document.querySelector(".recent_product").clientWidth


   for (index = 0; index < allproduct.length && index < 30; index++) {
      element = allproduct[index];

      if (cx < 575) {
         count = 3
      }

      listdiv = listdiv + ' <div class="col-lg-4 col-sm-4"><div class="box_main"><h4 class="shirt_text">' + element.prodName + '</h4><h6 class="model_text">' + element.proModel + '</h6><p class="price_text">Price :  <span style="color: #262626;">' + element.proPrice + '  Birr</span></p> <div class="tshirt_img"><img src="' + element.proPhoto + '"></div><div class="btn_main"><input type="hidden" name="id_of_prod" id="id_of_prod" value="' + element.proId + '"> <div class="buy_bt">' + iscart(element.proId) + '</div><div class="fav_bt">' + isfav(element.proId) + '</div></div></div></div>'



      if (count == 3) {
         var rowstart = '  <div class="container"><div class="fashion_section_2"><div class="row">'
         var rowend = " </div></div></div>";
         var creatediv = document.createElement("div")
         creatediv.setAttribute("class", "carousel-item")
         if (round == 0) {
            creatediv.classList.add("active")
            round = 1

         }
         creatediv.innerHTML = rowstart + listdiv + rowend;
         count = 0;

         x.appendChild(creatediv);

         listdiv = ""


      }

      count++;



   }


   forclick(".recent_product")
}
window.onscroll = function () {
closeNav();
if (currentscrolbody + 60 <= document.documentElement.scrollTop) {
   document.querySelector(".cartbut").style.top = "105%";
   currentscrolbody = document.documentElement.scrollTop

}
else if (currentscrolbody - 60 >= document.documentElement.scrollTop) {
   document.querySelector(".cartbut").style.top = "85%";

   currentscrolbody = document.documentElement.scrollTop

}

}
document.querySelector(".search_btn").addEventListener("click", function () {
   searched()
}
)
document.querySelector("#clearsearch").addEventListener("click", function () {
   document.querySelector(".search_section").classList.remove("d-flex");
   document.querySelector(".banner_section").classList.remove("d-none")
}
)
async function searched() {
   var searched_items = document.querySelector(".search_items");
   searched_items.innerHTML = "";

   var search_input = document.querySelector("#search_input").value;
   search_input = search_input.toLowerCase()
   if (search_input != "") {
      document.querySelector(".search_section").classList.add("d-flex");
      document.querySelector(".banner_section").classList.add("d-none")
      var count = 0;
      if (element.prodName.indexOf(search_input)) {
         console.log("hell0 " + element.prodName.indexOf(search_input))
      }
      for (index = 0; index < allproduct.length && index < 30; index++) {
         element = allproduct[index];
         if (element.prodName.toLowerCase().indexOf(search_input) != -1 || element.proCatagory.toLowerCase().indexOf(search_input) != -1 || element.proPrice.indexOf(search_input) != -1 || element.proModel.toLowerCase().indexOf(search_input) != -1) {
            var creatediv = document.createElement("div")
            creatediv.setAttribute("class", "items m-0")
            var setitem = '<div class=" "><div class="search_img w-25"><img src="' + element.proPhoto + '"></div><div class="discrpro w-50"><h4 class="shirt_text">' + element.prodName + '</h4><h6 class="model_text">' + element.proModel + '</h6><p class="price_text">Price <span style="color: #262626;">$ ' + element.proPrice + '</span></p></div><div class=""> <input type="hidden" name="id_of_prod" class="no_fav_product" value="' + element.proId + '"><div class="buy_bt">' + iscart(element.proId) + '</div><div class="fav_bt">' + isfav(element.proId) + '</div></div></div>'
            creatediv.innerHTML = setitem;
            searched_items.appendChild(creatediv);
            count++;

         }
      }
 
      if (count == 0) {
         var p = document.createElement("p")
         p.setAttribute("class", "font-italic text-info text-center position-relative w-100 ")
         p.textContent = "no search result ";
         searched_items.appendChild(p);
      }

   }
   else {
      document.querySelector(".search_section").classList.remove("d-flex");
      document.querySelector(".banner_section").classList.remove("d-none")
   }

   forclick(".search_items")
}

function deletecartbtn() {
   document.querySelector(".cartbut").style.display = "none";
}

setmenus("#mySidenav", 1);
setmenus(".login_menu", 2);
setmenus(null, 3);
setmenus("#bottom_menu", 4);
setmenus("#cartbut", 5);
var allproduct
var chersoal=false;
    var z=    start()
async   function start(){
   
       
      let formdata = new FormData();
      formdata.append("option", 1)
      var response = await fetch('productprocess.php', { method: "POST", body: formdata })
      allproduct = await response.json();
      setproductcatagory();
      setproduct();
   
}

  


async function setmenus(set_to, menuoff) {
   let formdata = new FormData();


   formdata.append("option", menuoff)

   var response = await fetch('setcomponents.php', { method: "POST", body: formdata })
   const mvr = await response.text();
   if (menuoff == 3) {
      if (mvr == "true") {
         var y = document.querySelectorAll("#top_button")
         y.forEach(element => {
            element.style.display = "none";
         });
      }

   } else {
      document.querySelector(set_to).innerHTML = mvr
   }

}


var menubarisclicked = false
function openNav() {
   document.getElementById("mySidenav").style.width = "250px";
   document.getElementById("mymenus").style.width = "100%";
   menubarisclicked = true
}

function closeNav() {
   document.getElementById("mySidenav").style.width = "0";
   document.getElementById("mymenus").style.width = "0";
   menubarisclicked = false
}


/// tp manage cart 

function managecartbt(obj) {

   var product = returnparent(obj, 2)

   var productid = product.querySelector("input").getAttribute("value")
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
      setcookies("familygebeyacart", all_pro_id)



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

      setcookies("familygebeyacart", new_cart_array)

   }

}


// to manage favorite product

function isfav(productid) {

   var a
   var old_fav_array = getcookies("familygebeyafavroite").split(",")
   if (old_fav_array.includes(productid) == true) {
      a = '<a class="fav" style="color:red"> <i class="fa fa-heart"></i></a>';
   }
   else {

      a = '<a class="fav" style="color:#262524"> <i class="fa fa-heart-o"></i></a>';

   }
  
   return a

}
function iscart(productid) {

   var button
   var old_fav_array = getcookies("familygebeyacart").split(",")
   if (old_fav_array.includes(productid) == true) {
      button = '<button class="cartbtn"> Cart</button>';

   }
   else {
      button = '<button class="dft_crt_btn"> + Cart</button>';

   }


   return button;
}
function managefav(obj) {
   var productid, product
   product = returnparent(obj, 2)
   productid = product.querySelector("input").getAttribute("value")
   var old_fav = getcookies("familygebeyafavroite")
   var old_fav_array = getcookies("familygebeyafavroite").split(",")

   if (obj.getAttribute("class") == "notfav") {
      obj.querySelector("i").classList.replace("fa-heart-o", "fa-heart")
      obj.style.color = "red"

      obj.setAttribute("class", "fav")


      product.querySelector("input").classList.add("fav_product")

      var all_pro_id = old_fav
      if (old_fav_array.includes(productid) == false) {
         if (old_fav_array.length != 0) {
            all_pro_id = all_pro_id + "," + productid
         }
         else {
            all_pro_id = productid
         }
      }

      setcookies("familygebeyafavroite", all_pro_id)





   } else {
      obj.querySelector("i").classList.replace("fa-heart", "fa-heart-o")
      obj.setAttribute("class", "notfav")
      obj.style.color = "#262524"



      product.querySelector("input").classList.remove("fav_product")
      var new_cart_array = ""
      var no_pro = 0;
      for (let index = 0; index < old_fav_array.length; index++) {

         var element = old_fav_array[index];
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

      setcookies("familygebeyafavroite", new_fav_array)

   }


}








window.onclick = function (event) {
   if (event.target == document.querySelector("#mymenus") && menubarisclicked == true) {
      closeNav();
   }
}
var currentscrolbody = 0

