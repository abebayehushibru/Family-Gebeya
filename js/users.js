
document.querySelector(".msgdiv").scrollTop = document.querySelector(".msgdiv").querySelector("div").clientHeight
document.querySelector("#sendmsg").addEventListener("click", sendmsg)
async      function sendmsg() {
    var allmassage = document.querySelector(".mymsg").innerHTML;
    var newmsg = document.querySelector("#newmsg").value;
    if (newmsg != "") {
       var clicked_user= document.querySelector("#user_id").textContent
        var creatediv = allmassage
        allmassage = allmassage + '<div class="mine"><p>' + newmsg + '</p></div>';
        document.querySelector("#newmsg").value = "";
        document.querySelector(".mymsg").innerHTML = allmassage
        document.querySelector(".msgdiv").scrollTop = document.querySelector(".msgdiv").querySelector("div").clientHeight
        let formdata = new FormData();
        formdata.append("option", 4)
        formdata.append("messagewith", clicked_user)
        formdata.append("message", newmsg)
        var response = await fetch('messageprocess.php', { method: "POST", body: formdata })
        const myvar = await response.json()

        console.log(myvar)
    }
} 


var is_popped = false
window.ondblclick = function () {
    if (is_popped == true) {
        document.querySelector(".popnotification").style.display = "none";
        is_popped == false

    }

}
document.querySelector(".popnotification").style.display = "none";


document.querySelector("#reset").addEventListener("click", function () {
    document.querySelector("#pop_massage").textContent = "Are you sure you want to reset a password ?";
    document.querySelector(".popnotification").style.display = "flex";
    is_popped = true

})
document.querySelector("#cancel").addEventListener("click", function () {
    document.querySelector(".popnotification").style.display = "none";
    is_popped == false
})
document.querySelector("#ok").addEventListener("click", function () {
    document.querySelector(".popnotification").style.display = "none";
    is_popped == false
    resetpwd()
})
async function resetpwd(){
var   Phone_Number=  document.querySelector("#Phone_Number").querySelector("a")
var resetpwdto=document.querySelector("#resetpwd")
if(resetpwdto!=""){
document.querySelector(".pwddiv").style.visibility="hidden"
let formdata = new FormData();

formdata.append("phone_number", Phone_Number.textContent)

formdata.append("Password", resetpwdto.value)
formdata.append("option", 3)

var response = await fetch('loginprocess.php', { method: "POST", body: formdata })
const myvar = await response.json();
document.querySelector(".pwddiv").style.visibility="visible"
if (myvar=="true") {

document.querySelector(".pwddiv").innerHTML='<p style="color:green;font-size:150%">Reseted successfuly</p>'
}
else{
document.querySelector(".pwddiv").innerHTML='<p style="color:red;font-size:150%">Error in resetting process</p>'
}

}




}
var all_users

function setobj(index) {
    var x = document.querySelector(".msglists");
    element = all_users[index];
    var name = element.first_name + " " + element.last_name;
    var creatediv = document.createElement("div")
    var hiddeninput = document.createElement("input");
    var image = document.createElement("img")
    var p1 = document.createElement("p")
    var p2 = document.createElement("p")



    creatediv.setAttribute("class", "msglist")
    hiddeninput.setAttribute("type", "hidden");
    hiddeninput.setAttribute("value", element.userID);

    image.setAttribute("class", "userimage");
    image.setAttribute("src", "images/banner-bg.png");
    p1.textContent = name;
    p2.textContent = element.messsagestatus
    creatediv.appendChild(hiddeninput)
    creatediv.appendChild(image)
    creatediv.appendChild(p1)
    creatediv.appendChild(p2)


    x.appendChild(creatediv)

}
function set_user_dicription(i){

for (index = 0; index < all_users.length && index < 30; index++) {
var element1 = all_users[index];

if (element1.userID == i) {
   

    document.querySelector("#fullname").textContent = element1.first_name +" "+element1.last_name;
    document.querySelector("#Phone_Number").innerHTML = '<a href="tel:' + element1.phone_number + '">' + element1.phone_number + '</a>'

    document.querySelector("#address").textContent = element1.addresses;
    document.querySelector("#user_id").textContent = element1.userID;
    document.querySelector("#order_no").innerHTML = element1.sum_order
}
else {
 
}

}


}

function search_users() {
    console.log("this is search function  " + all_users.length)

    var search_people = document.querySelector("#search_people").value.toLowerCase()

    document.querySelector(".msglists").innerHTML = "";


    for (index = 0; index < all_users.length; index++) {
        element = all_users[index];
        var name = element.first_name + " " + element.last_name;
        var forcheckname = name
        if (search_people == "" || (forcheckname.toLowerCase().search(search_people) != -1)) {
            setobj(index);
        }

    }

    forclick();



}
setNames()
async function setNames() {
    document.querySelector(".msglists").innerHTML = "";
    var x = document.querySelector(".msglists");

    let formdata = new FormData();
    formdata.append("option", 5)

    var response = await fetch('try.php', { method: "POST", body: formdata })
    all_users = await response.json();
    console.log(all_users)
    var search_people = document.querySelector("#search_people").value.toLowerCase()
    for (index = 0; index < all_users.length; index++) {
        element = all_users[index];

        var name = element.first_name + " " + element.last_name;
        var forcheckname = name

        var creatediv = document.createElement("div")
        var hiddeninput = document.createElement("input");
        var image = document.createElement("img")
        var p1 = document.createElement("p")
        var p2 = document.createElement("p")

        creatediv.setAttribute("class", "msglist")
        hiddeninput.setAttribute("type", "hidden");
        hiddeninput.setAttribute("value", element.userID);

        image.setAttribute("class", "userimage");
        image.setAttribute("src", "images/banner-bg.png");
        p1.textContent = name;
        p2.textContent = element.messsagestatus
        creatediv.appendChild(hiddeninput)
        creatediv.appendChild(image)
        creatediv.appendChild(p1)
        creatediv.appendChild(p2)

        if (search_people == "" || (forcheckname.toLowerCase().search(search_people) != -1)) {

            x.appendChild(creatediv)

        }

    }

    var allmessage_or_user = document.querySelectorAll(".msglist");
    if (window.innerWidth > 950) {

        var element = allmessage_or_user[0];
        document.querySelector("#user_name").textContent = element.querySelector("p").textContent
        clicked_user = element.querySelector("input").value

        movediv(2, clicked_user);
    }

    forclick();
    
}
function sortBy(){
    var sortby= document.querySelector("#sortby").value
    document.querySelector(".msglists").innerHTML = "";
  
var   myarray=all_users
   
    if(sortby=="name"){
    myarray.sort(function(a,b){
    var x = a.first_name.toLowerCase();
    var y = b.first_name.toLowerCase()
    if(x>y){
       
        return 1;
    }
    if(x<y){
      
        return -1;
    }
    if(x==y){
        var x1 = a.last_name.toLowerCase();
        var y1 = b.last_name.toLowerCase()
        if(x1>y1){
           
            return 1;
        }
        if(x1<y1){
       
            return -1;
        }
    }
           
                            })   
    }
    if(sortby=="orders"){
        myarray.sort(function(a,b){
            var x = Number( a.sum_order)
            var y = Number(b.sum_order)
            if(x>y){
               
                return -1;
            }
            if(x<y){
               
                return 1;
            }
                            })    
    }
    for (index = 0; index < myarray.length; index++) {
      
            setobj(index);
    
    }
    forclick()
    }
document.querySelector("#sortby").addEventListener("change", function(){sortBy()})
function forclick() {
    var allmessage_or_user = document.querySelectorAll(".msglist");
    allmessage_or_user.forEach(element => {
        element.addEventListener("click", function () {
            document.querySelector("#user_name").textContent = element.querySelectorAll("p")[0].textContent
            clicked_user = element.querySelector("input").value;
            document.querySelector(".mymsg").innerHTML = "";
          
            movediv(2, clicked_user);
        })

    });
}





document.querySelector("#backarrow").addEventListener("click", function () {
    movediv(1, "no")
})

function movediv(opr, rr) {

    if (opr == 1) {
        document.querySelector(".adminmessage").scrollLeft = "0px"
        document.querySelector(".message_display").style.display = "none";

    } else {
        document.querySelector(".message_display").style.display = "";
   document.querySelector(".pwddiv").innerHTML=' <input type="text" id="resetpwd" placeholder="reset password"style=" position:relative; max-width: 40%; margin-right:40px ;height:30px;padding:5px"><button id="reset"style="background-color: rgb(66, 66, 228);  color:white;padding: 5px; box-shadow:1px 1px 0.2px black; border-radius:5px;">Restpassword</button>'
        document.querySelector(".adminmessage").scrollLeft = document.querySelector(".adminmessage").querySelector("div").clientWidth
       
document.querySelector("#reset").addEventListener("click", function () {
    document.querySelector("#pop_massage").textContent = "Are you sure you want to reset a password ?";
    document.querySelector(".popnotification").style.display = "flex";
    is_popped = true

})
       
        set_user_dicription(rr)

    }



}

