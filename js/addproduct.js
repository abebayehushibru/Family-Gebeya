
async function saveproduct() {
    var formdata = new FormData();

    var allphoto = ""
    var allname = ""
    var allmodel = ""
    var allprice = ""
    var allcatagories = ""
    var error = ""
    var allframes = document.querySelectorAll(".frames")
    for (index = 0; index < allframes.length; index++) {
        var delm = ","
        var tojson = '"'

        if (index == 0) {
            delm = "";

        }
        if (allframes[index].querySelector(".photo").value == null) {
            error = " photo ";
        }

        else if (allframes[index].querySelector(".proName").value == "") {
            error = " Name  ";

        }
        else if (allframes[index].querySelector(".model").value == "") {
            error = " Model ";
        }
        else if (allframes[index].querySelector(".proprice").value == "") {
            error = " Price ";
        }

        else if (allframes[index].querySelector("#product_catagory").value == "") {
            error = " Catagory ";
        }
        if (error != "") {
            document.querySelector(".errormsg").textContent = "you forget entering product " + error + " in  product " + Number(index + 1);
            return 0;
        }
        var photoof = "photo" + index;
        var photo = allframes[index].querySelector(".photo").files[0]

        allname = allname + delm + '"' + allframes[index].querySelector(".proName").value + '"';
        allmodel = allmodel + delm + '"' + allframes[index].querySelector(".model").value + '"';
        allprice = allprice + delm + '"' + allframes[index].querySelector(".proprice").value + '"';
        allcatagories = allcatagories + delm + '"' + allframes[index].querySelector("#product_catagory").value + '"';
        console.log(allcatagories + "," + allmodel + "," + allname + "," + allphoto + "," + allprice)
        //   console.log(photo.files[0])
        formdata.append(photoof, photo);
    }
    allname = '{"proNames":[' + allname + '] }';
    allmodel = '{"proModels":[' + allmodel + '] }';
    allprice = '{"proPrices":[' + allprice + '] }';
    allcatagories = '{"proCatagories":[' + allcatagories + '] }';


    formdata.append("prodName", allname);
    formdata.append("proModels", allmodel);
    formdata.append("proPrices", allprice);
    formdata.append("proCatagories", allcatagories);

    var response = await fetch('addproductprocess.php', { method: "POST", body: formdata })
    const json = await response.json();
    if (json == "true") {
        document.querySelector(".errormsg").textContent = '';
        document.querySelector(".success").textContent = 'Product added successf';
        document.querySelector(".myframes").innerHTML = "";
        addframe();

    }else if(json=="login"){
      window.location.assign("./login.html")
      }
    
    else {
        document.querySelector(".errormsg").textContent = json;
    }
    console.log(json)

}


document.querySelector(".popnotification").style.display = "none";
var opr = 0
document.querySelector("#cancel").addEventListener("click", function () {
    opr = -1
    document.querySelector(".popnotification").style.display = "none";
    if (isforcart == false) {
        ordernow()
    } else {
        deletecart()
    }
})
document.querySelector("#ok").addEventListener("click", function () {
    document.querySelector(".popnotification").style.display = "none";
    opr = 1
    if (isforcart == false) {
        ordernow()
    } else {
        deletecart()
    }

})





function addframe() {
    var allframes = document.querySelector(".myframes")
    var creatediv = document.createElement("div")
    creatediv.setAttribute("class", "col")
    creatediv.setAttribute("style", "width: 98%;left: 1%;")
    creatediv.innerHTML = ' <div class="col col frames" id="div1"><div class="box_main d-flex"><div class="pro_img"><input type="file" name="photo" class="photo" onchange="setimage(this)"><img src="images/tshirt-img.png"></div> <div class="discrpro"><input type="text" name="proName" class="proName" placeholder="name of product "><input type="text" class="model" name="model" placeholder="model of product"> <span style="color: #262626;" id="price"> <input type="number" class="proprice" min="10" placeholder="price" aria-controls="none"></span>  </div><div class="input_price_div"><div> <span id="select_catagory">Catagories<select class="m-0 w-75" name="product_catagory" id="product_catagory">\<option value="Clothing_and_Accessories">Clothing and Accessories</option><option value="Electronics_and_Gadgets">Electronics and Gadgets</option><option value="Home_and_Kitchen_Appliances">Home and Kitchen Appliances</option><option value="Beauty_and_Personal_Care_Products"> Beauty and Personal Care Products</option><option value="Sports_and_Fitness_Equipment">Sports and Fitness Equipment</option><option value="Books_and_Stationery">Books and Stationery</option> <option value="Toys">Toys </option><option value="Furniture">Furniture</option><option value="Baby_and_Kids">Baby and Kids </option><option value="Health_and_Wellness_Products"> Health and Wellness Products</option> </select></span></div><div >    <a class="" onclick="setcart(this)">&times;</a>  </div></div></div></div>';
    allframes.appendChild(creatediv)
}
function setimage(input) {

    if (input.files && input.files[0]) {
        var upphoto = input.parentElement.querySelector("img");

        let reader = new FileReader();
        reader.onload = function (e) {
            upphoto.setAttribute('src', e.target.result)



        }
        reader.readAsDataURL(input.files[0]);
    }
    movefile(input);
}




function deletecart() {
    if (opr == 1) {
        clickedcart.remove();

    }
    document.querySelector(".popnotification").style.display = "none";
    isforcart = false;
}





window.onclick = function (event) {
    if (event.target == document.querySelector(".popnotification")) {
        document.querySelector(".popnotification").style.display = "none";
    }
}
window.onscroll = function () {
    document.querySelector(".popnotification").style.display = "none";
}
var clickedcart
var isforcart = false
function setcart(clk_obj) {
    isforcart = true;
    document.querySelector("#pop_massage").textContent = "do you want to delete a Template"
    document.querySelector(".popnotification").style.display = "flex";
    clickedcart = clk_obj.parentElement.parentElement.parentElement.parentElement;

}
