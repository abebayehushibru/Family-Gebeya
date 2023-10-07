
var opr = 0
document.querySelector("#cancel").addEventListener("click", function () {
    opr = -1


    deletecart()

})
document.querySelector("#ok").addEventListener("click", function () {
    opr = 1

    deletecart()


})






async  function deletecart() {
    if (opr == 1) {
       
       
        let formdata = new FormData();
        formdata.append("option", 2)
        formdata.append("deleteprod", clickedcart.querySelector("input").value)
        var response = await fetch('updateproduct.php', { method: "POST", body: formdata })
        const json = await response.json();
        if(json=="true"){
            document.querySelector(".simplenotfy").style.top = "80%";
            document.querySelector(".msg").textContent='Product deleted successfuly!';
            clickedcart.remove();
           
          
        }
        else{
            document.querySelector(".msg").textContent="Error has occurred \n please try again";
        }
        var count=3;
        x = setInterval(function () {
          if (count==0) {
            document.querySelector(".simplenotfy").style.top = "100%";
              clearInterval(x); 
}
count--;
},1000);

    }
    document.querySelector(".popnotification").style.display = "none";
    isforcart = false;
}

var isnewSetphoto=false;
setproduct()
async function updateproduct() {
    var formdata = new FormData();
 
    var newphoto
    var newname  = editting_of_product.querySelector("#name_of_product").value
    var newmodel = editting_of_product.querySelector("#model_of_product").value
    var newprice = editting_of_product.querySelector("#price_of_product").value
    var setToId  = editting_of_product_id 

    var error = ""
   
     if (newname == "") {
        error = " Name  ";

    }
    else if (newmodel == "") {
        error = " Model ";
    }
    else if (newprice == "") {
        error = " Price ";
    }

    if(error=="")
{
if(editting_of_product.querySelector("#newphoto").files[0]!=null){
 newphoto = editting_of_product.querySelector("#newphoto");  
 formdata.append("issetphoto", "true") 
 formdata.append("newphoto", newphoto.files[0]);
 isnewSetphoto=false;
 console.log( newphoto.files[0])

}
else{

newphoto=   editting_of_product.querySelector("img");
console.log( newphoto)
formdata.append("issetphoto", "false") 
formdata.append("newphoto", newphoto.getAttribute("src"));
}
formdata.append("prodName", newname)
formdata.append("proModels", newmodel)
formdata.append("proPrices", newprice)

formdata.append("setToId", setToId);
formdata.append("option", 1);
var response = await fetch('updateproduct.php', { method: "POST", body: formdata })
const json = await response.json();
if(json=="true"){

document.querySelector(".msg").textContent='Product updated successfuly';

}
else{
document.querySelector(".msg").textContent=json;
}
document.querySelector(".simplenotfy").style.top = "80%";

}
else{
document.querySelector(".msg").textContent='please enter product new '+error;
document.querySelector(".simplenotfy").style.top = "80%";
}
var count=3;
x = setInterval(function () {
if (count==0) {
document.querySelector(".simplenotfy").style.top = "100%";
clearInterval(x); 
}
count--;
},1000);


}


async function setproduct() {
    var x = document.querySelector(".my_product");
    let formdata = new FormData();
    formdata.append("option", 1)
    var response = await fetch('productprocess.php', { method: "POST", body: formdata })
    allproduct = await response.json();


    for (index = 0; index < allproduct.length && index < 30; index++) {
        element = allproduct[index];
        var div = document.createElement("div")
        div.setAttribute("class", "col col")
        var productItem = '<div class="box_main d-flex"><input type="hidden" name="id_of_prod" id="id_of_prod" value="' + element.proId + '"><div class="pro_img"><img src="' + element.proPhoto + '"></div><div class="discrpro"><h4 class="shirt_text">' + element.prodName + '</h4><h6 class="model_text">' + element.proModel + '</h6></div><div class="pricediv"><p class="price_text"> Price <span style="color: #262626;" id="price"> ' + element.proPrice + ' </span>Birr</p><div class="fav_bt"><button  class="edit">Edit</button> <a  id="deletecart" onclick="setcart(this)">&times;</a></div></div></div>'
        div.innerHTML = productItem;

        x.appendChild(div);

    }
    var edit = document.querySelectorAll(".edit")
    edit.forEach(element => {

        element.addEventListener("click", function () {

            movediv(0, returnparent(this, 3))
        })
    });

}





document.querySelector("#backbutton").addEventListener("click", function () {
    movediv(1, "")
})


var editting_of_product_id


var editting_of_product = document.querySelector(".editting_of_product")


function movediv(opr, obj) {

    if (opr == 1) {
       document.querySelector(".mydivcontainer").querySelector("div").style.left = "0%"
        document.querySelector("#orderdiscr").querySelector(".fashion_section_2").style.display = "none"
         editting_of_product.querySelector("#newphoto").value=null
   } else {

        document.querySelector(".mydivcontainer").querySelector("div").style.left = "-100%"

        editting_of_product_id = obj.querySelector("#id_of_prod").getAttribute("value")

    



        editting_of_product.querySelector("img").setAttribute("src", obj.querySelector("img").getAttribute("src"))
        editting_of_product.querySelector("#name_of_product").setAttribute("value", obj.querySelector("h4").textContent)
        editting_of_product.querySelector("#model_of_product").setAttribute("value", obj.querySelector("h6").textContent)
        editting_of_product.querySelector("#price_of_product").setAttribute("value", Number(obj.querySelector("span").textContent))


        document.querySelector("#orderdiscr").querySelector(".fashion_section_2").style.display = "flex"

    }

}



function setimage(input) {

    if (input.files && input.files[0]) {


        let reader = new FileReader();
        reader.onload = function (e) {
            editting_of_product.querySelector("img").setAttribute('src', e.target.result)



        }
        reader.readAsDataURL(input.files[0]);
    }
   
}



document.querySelector(".popnotification").style.display = "none";
var clickedcart
var isforcart = false
function setcart(clk_obj) {
    isforcart = true;
    document.querySelector("#pop_massage").textContent = "do you want to delete a product"
    document.querySelector(".popnotification").style.display = "flex";
    clickedcart = clk_obj.parentElement.parentElement.parentElement.parentElement;

}


