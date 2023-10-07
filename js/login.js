

document.querySelector("#login").addEventListener("click", login)
document.querySelector("#check").addEventListener("click", forget)
document.querySelector("#Change").addEventListener("click", changepwd)
let regnum = /^0+[7,9]+[0-9]{8}$/;
let regnum1 = /^[+]251+[79][0-9]{8}$/;
let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;

document.querySelector(".forget").addEventListener("click", function () {
    movecontainer(-100)
})

document.querySelector("#from_forget_pwd").addEventListener("click", function () {
    movecontainer(0)
})
document.querySelector("#from_new_pwd").addEventListener("click", function () {
    movecontainer(0)
})
function movecontainer(moveto) {
    document.querySelector(".logincontainer").querySelector("div").style.left = moveto + "%";
}


async function login() {
    var errorm = ''
    var phonenumberid = document.querySelector("#phone_number").value;
    var Passwordid = document.querySelector("#Password").value
    var errormsg = document.querySelector("#error_msg");



    if (phonenumberid == "") {
        errorm = " You forget entering phone number";

    }
    else if (!(regnum.test(phonenumberid) || regnum1.test(phonenumberid))) {

        errorm = "PLEASE Enter correct phone number";

    }


    else if (Passwordid == "") {

        errorm = "PLEASE enter password";
    }


    else if (Passwordid.length < 6) {

        errorm = "Your password must be at least 6 character  ";


    }

    if (errorm != "") {
        errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">" + errorm + " </span>";

    }
    else {

        let formdata = new FormData();

        formdata.append("phone_number", phone_number.value)
        formdata.append("Password", Password.value)
        formdata.append("option", 1)





        var response = await fetch('loginprocess.php', { method: "POST", body: formdata })
        const myvar = await response.json();
        // var vdv= 'jufhu'
        // var d= JSON.stringify()
        if (myvar == "true") {
            window.location.assign("./index.html")
        }
        else {
            errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">" + myvar + " </span>";

        }

    }
}


async function forget() {
    var errorm = ""


    var phonenumberid = document.querySelector("#forget_phone_number").value;

    var favoriteid = document.querySelector("#favorite_color").value
    var errormsg = document.querySelector("#wrong_favorite");



    if (phonenumberid == "") {
        errorm = " You forget entering phone number";

    }
    else if (!(regnum.test(phonenumberid) || regnum1.test(phonenumberid))) {

        errorm = "PLEASE Enter correct phone number";

    }





    else if (favoriteid == "") {

        errorm = " You forget entering favorite color";

    }

    if (errorm != "") {
        errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">" + errorm + " </span>";

    }
    else {

        let formdata = new FormData();

        formdata.append("phone_number", forget_phone_number.value)
        formdata.append("favorite", favorite_color.value)
        formdata.append("option", 2)

        var response = await fetch('loginprocess.php', { method: "POST", body: formdata })
        const mvr = await response.json();
        if (mvr == "true") {
            movecontainer(-200);
        } else {
            
if(trial_for_forgrt<3){
errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">please check your <br> phone number or favorite </span>";

}
else{
errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">please make call for system admin <br>Thank you</span>";

}
trial_for_forgrt++;        
        }


    }
}
var trial_for_forgrt=0;
async function changepwd() {
    var errorm = ""


    var Passwordid = document.querySelector("#newPassword").value
    var cmPassword = document.querySelector("#cmPassword").value

    var errormsg = document.querySelector("#change_error_msg");

    let regnum = /^0+[7,9]+[0-9]{8}$/;
    let regnum1 = /^[+]251+[79][0-9]{8}$/;
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;



    if (Passwordid == "") {

        errorm = "PLEASE enter password";
    }


    else if (Passwordid.length < 6) {

        errorm = "Your password must be at least 6 character  ";


    }
    else if (Passwordid != cmPassword) {

        errorm = "Your password not match  ";


    }



    if (errorm != "") {
        errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">" + errorm + " </span>";

    }
    else {
        document.querySelector("#Change").style.display="none";
        let formdata = new FormData();

        formdata.append("phone_number", forget_phone_number.value)

        formdata.append("Password", newPassword.value)
        formdata.append("option", 3)

        var response = await fetch('loginprocess.php', { method: "POST", body: formdata })
        const myvar = await response.json();

        if (myvar=="true") {
            var count=5;
          x = setInterval(function () {
            if (count==0) {
                clearInterval(x)
                window.location.assign("./login.html")
}
            
    document.querySelector("#change_error_msg").innerHTML = "<span style=\"color:black; font-size:18pxl\"> skipped in " + count + " sec or <button id=\"skip\" style=\" background-color:black; color:white; border-radius:4px ;padding:4px;\"> Skip </button> </span>";
count--;

            },1000)
         
        } else {
            
        }


    }
}
var x


document.querySelector("#skip").addEventListener("click", function () {
clearInterval(x)
window.location.assign("./login.html")
})


