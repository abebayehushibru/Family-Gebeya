
var allinput = document.querySelectorAll("input")
allinput.forEach(element => {
    element.addEventListener("focus", function () {
        document.querySelector("#error_msg").textContent = ""
    })
});
document.querySelector("textarea").addEventListener("focus", function () {
    document.querySelector("#error_msg").textContent = ""
})
async function validateinputs() {
    document.querySelector(".registerBTN").style.display="none"
    var errorm = ""
    var first_nameid = document.querySelector("#first_name").value;
    var last_nameid = document.querySelector("#last_name").value;

    var phonenumberid = document.querySelector("#phone_number").value;
    var addressid = document.querySelector("#Address").value
    var Passwordid = document.querySelector("#Password").value
    var cmPassword = document.querySelector("#cmPassword").value
    var favoriteid = document.querySelector("#favorite").value
    var errormsg = document.querySelector("#error_msg");

    let regnum = /^0+[7,9]+[0-9]{8}$/;
    let regnum1 = /^[+]251+[79][0-9]{8}$/;
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/;

    if (first_nameid.trim() == "") {
        errorm = "You forget entering first name";

    }
  else  if (last_nameid.trim() == "") {
        errorm = "You forget entering last name";

    }
    else if (phonenumberid == "") {
        errorm = " You forget entering phone number";

    }
    else if (!(regnum.test(phonenumberid) || regnum1.test(phonenumberid))) {

        errorm = "PLEASE Enter correct phone number";

    }
    else if (addressid == "") {

        errorm = " You forget entering address";

    }

    else if (Passwordid == "") {

        errorm = "PLEASE enter password";
    }


    else if (Passwordid.length < 6) {

        errorm = "Your password must be at least 6 character  ";


    }
    else if (Passwordid != cmPassword) {

        errorm = "Your password not match  ";


    }

    else if (favoriteid == "") {

        errorm = " You forget entering favorite color";

    }

    if (errorm != "") {
        
        errormsg.innerHTML = "<span style=\"color:red; font-size:18pxl\">" + errorm + " </span>";
        document.querySelector(".registerBTN").style.display=""

    }
    else {

        let formdata = new FormData();
        formdata.append("first_name", first_name.value)
        formdata.append("last_name", last_name.value)
        formdata.append("phone_number", phone_number.value)

        formdata.append("address", Address.value)
        formdata.append("Password", Password.value)

        formdata.append("favorite", favorite.value)

        var response = await fetch('registerme.php', { method: "POST", body: formdata })
        const json = await response.json();
        console.log(json)
        if(json=="true"){
            window.location.assign("./login.html");
        }


    }
}


