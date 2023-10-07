<?php
/*  step 1  CREATE DATABASE familygebeya

step 2:

CREATE TABLE users (
    userID int AUTO_INCREMENT PRIMARY key,
    first_name varchar(15),
    last_name varchar(15),
       phone_number varchar(15) UNIQUE  not null,
 
      addresses text,
    Passwords text,
    favorite varchar(15),
    usertype varchar(20) DEFAULT 'user'
);
before step 3 
registare your self 
for making you admin;

step 3:

make your usertype : admin

UPDATE users
SET usertype="admin"
WHERE userID=1;


stepn:4 
create messages table

CREATE TABLE messages(
    messageId int PRIMARY key AUTO_INCREMENT,
    messageContent text not null,
    messageSenderId int not null,
    messageFrom int not null,
    messageTo int not null,
    messsagestatus varchar(20) DEFAULT  "new" ,
   dates VARCHAR( 200 ) NOT NULL );

    step : 5 
    create product table


    create TABLE products (
        proId int PRIMARY key AUTO_INCREMENT,
        prodName varchar(300) not null,
        proModel varchar(500) not null,
        proPrice double not null,
        proCatagory varchar (100),
        proPhoto TEXT NOT NULL )


        step : 6
        create orders table

          create TABLE orders (
        orderId int PRIMARY key AUTO_INCREMENT,
        userid int not null,
        orderby varchar(100) not null,
        orderedCarts Text not null,
        useraddres TEXT NOT NULL,
        userephone varchar (100),
        choosenBank varchar(100),
        BankSlip varchar(200),
       dates VARCHAR( 20 ) NOT NULL  ;
 )
*/


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "familygebeya";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
   
    die("Connection failed: " . $conn->connect_error);
}

?>