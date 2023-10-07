
getmessages(1,"10") 
async function getmessages(of,with_user){
  var x=   document.querySelector(".msgdiv").querySelector("div");
    let formdata = new FormData();
    formdata.append("option", 1)
if(of==2){
    formdata.append("messagewith", with_user)
}
    var response = await fetch('messageprocess.php', { method: "POST", body: formdata })
    const myvar = await response.json();
    var user_id=myvar[0].userId;
    for(index=1;index<myvar.length;index++){
        element=myvar[index];
        var creatediv= document.createElement("div")
        if(user_id==element.messageFrom){
            creatediv.setAttribute("class","mine")
            console.log(element.messageContent )  
        }
     else{
        creatediv.setAttribute("class","other")
     }
     creatediv.innerHTML='<p>'+element.messageContent +'</p>';
     x.appendChild(creatediv)
    }
   
  
   
    document.querySelector(".msgdiv").scrollTop= document.querySelector(".msgdiv").querySelector("div").clientHeight
   console.log(myvar)

}
      document.querySelector(".msgdiv").scrollTop= document.querySelector(".msgdiv").querySelector("div").clientHeight
        document.querySelector("#sendmsg").addEventListener("click",sendmsg)
       async function sendmsg() {
      var allmassage=  document.querySelector(".msgdiv").querySelector("div");
      var newmsg=document.querySelector("#newmsg").value;

     if (newmsg!="") {
        var creatediv= document.createElement("div")
        creatediv.setAttribute("class","mine")
        creatediv.innerHTML='<p>'+newmsg+'</p>'

      allmassage.appendChild(creatediv)
      document.querySelector(".msgdiv").scrollTop= document.querySelector(".msgdiv").querySelector("div").clientHeight
      let formdata = new FormData();
      formdata.append("option", 4)
      formdata.append("message", newmsg)
      var response = await fetch('messageprocess.php', { method: "POST", body: formdata });
      
      const myvar = await response.json();
      console.log(myvar)
      
      document.querySelector("#newmsg").value="";

     } 
       } 
     
    