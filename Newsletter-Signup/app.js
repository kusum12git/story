//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname +"/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
}); 

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            } 
        ]
    };
 
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/81d708dabc";
    const options = {
        method: "POST",
        auth: "12Kusum:6339f6529b88e9915fc561f440e082f7-us9"
    };

    const request = https.request(url, options, function (response) {
        if(response.statusCode===200){
            res.sendFile(__dirname+ "/success.html");
        }else{
            res.sendFile(__dirname+ "/failure.html");
            // res.send("There was an error with signing up, please try again!");
            
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

    app.post("/failure", function(req, res){
       res.redirect("/") 
     });

    // console.log(firstName, lastName, email);
    // res.send("Thank you for signing up!");
}); 

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});


//API KEY
//6339f6529b88e9915fc561f440e082f7-us9

// we got this api key from mailchimp website by clicking on my profile>


//81d708dabc- url id

//audience id - 81d708dabc



//5e8155fe4699cb478e474f6290032e75-us9



