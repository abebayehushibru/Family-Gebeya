


function setcookies(name ,values) {
    var d= new Date()
        d.setTime(d.getTime() + (7*24*60*60*1000))
    var expires = "expires="+d.toUTCString();
    document.cookie=name+"="+values+";"+expires+"; path=/";
}
function getcookies(name) {
    var cname=name+"=";
    var element
    var ca=document.cookie.split(";")
  for (let index = 0; index < ca.length; index++) {
    element= ca[index];
        
 
        while (element.charAt(0)==' ') {
            element=element.substring(1);
        }
        if (element.indexOf(cname)==0) {
        return element.substring(cname.length,element.length);   
        }

    }
       
    return   " "
}


function returnparent (element,nthparent){
   var  parentelement=element;
    for (let index = 0; index < nthparent; index++) {
        parentelement = parentelement.parentElement;
        
    }
    return parentelement
}
// messages


     