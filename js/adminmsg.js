
document.querySelector("#backarrow").addEventListener("click", function () {
    movediv(1, "no")
})


document.querySelector(".msgdiv").scrollTop = document.querySelector(".msgdiv").querySelector("div").clientHeight
document.querySelector("#sendmsg").addEventListener("click", sendmsg)

var clicked_user = 0
async function sendmsg() {
    var allmassage = document.querySelector(".msgdiv").querySelector("div").innerHTML;
    var newmsg = document.querySelector("#newmsg").value;
    if (newmsg != "") {
        var creatediv = allmassage
        allmassage = allmassage + '<div class="mine"><p>' + newmsg + '</p></div>';
        document.querySelector("#newmsg").value = "";
        document.querySelector(".msgdiv").querySelector("div").innerHTML = allmassage
        document.querySelector(".msgdiv").scrollTop = document.querySelector(".msgdiv").querySelector("div").clientHeight

        let formdata = new FormData();
        formdata.append("option", 4)
        formdata.append("messagewith", clicked_user)
        formdata.append("message", newmsg)
        var response = await fetch('messageprocess.php', { method: "POST", body: formdata })
        const myvar = await response.json();
    }
}
document.querySelector("#search_people").onkeyup=function(){

getmessagessender();
console.log("pressed")
}
getmessagessender()
async function getmessagessender() {
    document.querySelector(".msglists").innerHTML="";
    var x = document.querySelector(".msglists");
    var all_id = new Array()
    let formdata = new FormData();
    formdata.append("option", 5)

    var response = await fetch('messageprocess.php', { method: "POST", body: formdata })
    const myvar = await response.json();
    myvar.reverse();
    var user_id = myvar[0].userId;
    var count = 0
    let index = 0
    var isfound=false 
    var search_people= document.querySelector("#search_people").value.toLowerCase()
    for (; index < myvar.length; index++) {
        element = myvar[index];
        
        if (!all_id.includes(element.messageSenderId)) {
            var name = element.first_name + " " + element.last_name;
            var forcheckname=name
            all_id[count] = element.messageSenderId
            count++;
         
           
            var creatediv = document.createElement("div")
            var hiddeninput = document.createElement("input");
            var image = document.createElement("img")
            var p1 = document.createElement("p")
            var p2 = document.createElement("p")
        


            creatediv.setAttribute("class", "msglist")
            hiddeninput.setAttribute("type", "hidden");
            hiddeninput.setAttribute("value", element.messageSenderId);

            image.setAttribute("class", "userimage");
            image.setAttribute("src", "images/avater.png");
            p1.textContent = name;
            p2.textContent = element.messsagestatus
            creatediv.appendChild(hiddeninput)
            creatediv.appendChild(image)
            creatediv.appendChild(p1)
            creatediv.appendChild(p2)
            
            if(search_people =="" || (forcheckname.toLowerCase().search(search_people)!=-1)){
                
            x.appendChild(creatediv)
            isfound=true
            }
           
        }
    }
    if(isfound==false){
        var p2 = document.createElement("p") 
        var creatediv = document.createElement("div") 
        p2.setAttribute("class", "text-info text-center font-italic font-bold")
        p2.textContent ="name Not Found!!"
        creatediv.appendChild(p2)
        x.appendChild(creatediv)
    }

    var allmessage_or_user = document.querySelectorAll(".msglist");
    if(window.innerWidth>950){
 
    var element= allmessage_or_user[0];
     document.querySelector("#users_name").textContent = element.querySelector("p").textContent
     clicked_user = element.querySelector("input").value
 
        movediv(2, clicked_user);
     }
   

allmessage_or_user.forEach(element => {
    element.addEventListener("click", function () {
        document.querySelector("#users_name").textContent = element.querySelector("p").textContent
        clicked_user = element.querySelector("input").value
        console.log(clicked_user)
        movediv(2, clicked_user);
    })

});
    
}

/// get messages

async function getmessages(of, with_user) {
    var x = document.querySelector(".msgdiv").querySelector("div");
    let formdata = new FormData();
    formdata.append("option", 1)
    if (of == 2) {
        formdata.append("messagewith", with_user)
    }
    var response = await fetch('messageprocess.php', { method: "POST", body: formdata })
    const myvar = await response.json();
    var user_id = myvar[0].userId;

    for (index = 1; index < myvar.length; index++) {
        ;
        element = myvar[index];

        var creatediv = document.createElement("div")
        if (user_id == element.messageFrom) {
            creatediv.setAttribute("class", "mine")

        }
        else {
            creatediv.setAttribute("class", "other")
        }
        creatediv.innerHTML = '<p>' + element.messageContent + '</p>';
        x.appendChild(creatediv)
    }
    document.querySelector(".msgdiv").scrollTop = document.querySelector(".msgdiv").querySelector("div").clientHeight
    console.log("finshed")
}

window.onscroll = function () {
    document.querySelector(".popnotification").style.display = "none";
}







function movediv(opr, of) {

    if (opr == 1) {
        document.querySelector(".adminmessage").scrollLeft = "0px"
        document.querySelector(".message_display").style.display = "none";

    } else if (opr == 2) {
        document.querySelector(".message_display").style.display = "";
        getmessages(2, of);
        document.querySelector(".adminmessage").scrollLeft = document.querySelector(".adminmessage").querySelector("div").clientWidth

    }

}





