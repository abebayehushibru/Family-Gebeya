
          
        var productArray;
        var allorder;
        setorders()

        async function setorders() {
            var orders = document.querySelector(".orders");
            let formdata = new FormData();
            //  formdata.append("option", 1)
            var response = await fetch('getOrder.php', { method: "POST", body: formdata })
            allorder = await response.json();
            for (index = 0; index < allorder.length && index < 50; index++) {
                var element = allorder[index];



                var div = document.createElement("div");
                div.setAttribute("class", "col col")
                div.setAttribute("id", "order")

                // <div class="col col" id="order" onclick="movediv()">

                var products = element.orderedCarts.replace(/\]/gi, " ");
                var products = products.replace(/\[/gi, " ")

                var countproduct = 0
                products = products.split(",")
                var noOfproduct = 0;
                var producrids = 0;
                var delm = ""

                for (i = 0; i < products.length; i++) {

                    if (i > 1) {
                        delm = ","
                    }
                    if (i % 2 == 1) {
                        countproduct = countproduct + Number(products[i].trim());
                        noOfproduct = Number(products[i].trim());

                        producrids++;

                    }

                }


                var content = '<input type="hidden" id="id" value="' + element.orderId + '"><div class="box_main d-flex"><div class="discrorder"><h4 class="shirt_text">' + element.orderId + '</h4><h6 class="model_text">No . ' + countproduct + '</h6><p class="price_text"> ' + element.dates + '</p></div></div>';
                div.innerHTML = content;
                orders.appendChild(div);
            }
            forclick()


        }

        function forclick() {
            var order = document.querySelectorAll("#order")
            order.forEach(element => {
                element.addEventListener("click", function () {
                    movediv(2, this)
                })

            });
        }
        document.querySelector("#selectstatus").addEventListener("change", function () {
            getOrders()
        })

        function getOrders() {
            console.log(allorder)
            document.querySelector(".orders").innerHTML = ""
            var orders = document.querySelector(".orders")
            var selectstatus = document.querySelector("#selectstatus").value
            for (index = 0; index < allorder.length && index < 50; index++) {
                var element = allorder[index];
                if (element.ordersStatus.toLowerCase() == selectstatus.toLowerCase() || selectstatus == "All") {




                    var div = document.createElement("div");
                    div.setAttribute("class", "col col")
                    div.setAttribute("id", "order")
                    // div.setAttribute("onclick", "movediv()");
                    // <div class="col col" id="order" onclick="movediv()">

                    var products = element.orderedCarts.replace(/\]/gi, " ");
                    var products = products.replace(/\[/gi, " ")

                    var countproduct = 0
                    products = products.split(",")
                    var noOfproduct = 0;
                    var producrids = 0;
                    var delm = ""

                    for (i = 0; i < products.length; i++) {

                        if (i > 1) {
                            delm = ","
                        }
                        if (i % 2 == 1) {
                            countproduct = countproduct + Number(products[i].trim());
                            noOfproduct = Number(products[i].trim());

                            producrids++;

                        }

                    }


                    var content = '<input type="hidden" id="id" value="' + element.orderId + '"><div class="box_main d-flex"><div class="discrorder"><h4 class="shirt_text">' + element.orderId + '</h4><h6 class="model_text">No . ' + countproduct + '</h6><p class="price_text"> ' + element.dates + '</p></div></div>';
                    div.innerHTML = content;
                    orders.appendChild(div);
                }

            }
            forclick();
        }
        var allproduct;
        allproductfun();
        async function allproductfun() {
            let formdata = new FormData();
            formdata.append("option", 1)
            var response = await fetch('productprocess.php', { method: "POST", body: formdata })
            allproduct = await response.json();
         
        }
        function setproduct(orID) {
            var orderItems = document.querySelector(".orderItems");
            console.log(allproduct)

            for (index = 0; index < allorder.length && index < 30; index++) {
                var element1 = allorder[index];

                if (element1.orderId == orID) {
                    var products = element1.orderedCarts.replace(/\]/gi, " ");
                    products = products.replace(/\[/gi, " ")

                    var countproduct = 0
                    products = products.split(",")
                    for (i = 0; i < products.length; i++) {

                        var productsindex = null
                        if (i % 2 == 0) {
                            for (j = 0; j < allproduct.length; j++) {
                                if (products[i] == allproduct[j].proId) {
                                    productsindex = j;
                                }
                            }
                        }
                        else {
                            var element = allproduct[Number(productsindex)]
                        
                            var div = document.createElement("div")
                            div.setAttribute("class", "col col")

                            var birr = Number(products[i]) * Number(element.proPrice)
                            console.log(birr)
                            var productItem = '<div class="box_main d-flex"><div class="pro_img"><img src="' + element.proPhoto + '"></div><div class="discrpro"> <h4 class="shirt_text">' + element.prodName + '</h4><h6 class="model_text">' + element.proModel + '</h6><p class="price_text"><span id="numberofitem" s>' + products[i] + '</span></span></p> </div><p class="price_text"> Price <span style="color: #262626;" id="price"> ' + birr + ' </span> <span>Birr</span></p> </div></div>';


                            div.innerHTML = productItem;
                           

                            orderItems.appendChild(div);
                        }

                    }



             
                    document.querySelector("#choosenBank").textContent = element1.choosenBank
                    document.querySelector("#bankslip").innerHTML = '<a target="_blank" rel="noopener noreferrer"href="' + element1.BankSlip + '"> <img src="' + element1.BankSlip + ' "style="position:relative;width:100px;" id="slip" name="slip">'
                }
                else {
                   
                }

            }

            total_number_and_birr()




        }





        document.querySelector("#backbutton").addEventListener("click", function () {
            movediv(1)
        })

        function movediv(opr, obj) {



            if (opr == 1) {
                document.querySelector(".mydivcontainer").querySelector("div").style.left = "0%"
                //setproduct
                document.querySelector(".orderItems").innerHTML = ""

            } else {
                var orID = obj.querySelector("#id").value
                document.querySelector(".mydivcontainer").querySelector("div").style.left = "-100%"
                setproduct(orID);


            }

        }
        var vc = document.querySelector(".fav_bt")
        total_number_and_birr()



        function total_number_and_birr() {
            var myelement = document.querySelectorAll("#numberofitem");
            var priceElement = document.querySelectorAll("#price");
            var total_number = 0
            var total_birr = 0;
            myelement.forEach(element => {
                total_number = total_number + Number(element.textContent)

            });
            priceElement.forEach(element => {
                total_birr = total_birr + Number(element.textContent)

            });
            document.querySelector("#totalnumber").textContent = total_number
            document.querySelector("#totalprice").textContent = total_birr
        }

    