//jshint esversion:6
const express = require("express");
const app = express();  //simply a function  that represent the express module we buying that to the word app

app.get("/", function(request, response){
  response.send("<h1>Hello, World!</h1>");
  // console.log("Request:", request);
  // console.log("Response:", response);
});

app.get("/contact", function(req, res){
  res.send("contact me at:kusumbarothiya@gamilcom");

});

app.get("/about", function(req, res){
  res.send("This is about page of the website");
});

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Coffee</li><li>Code</li><li>Beer</li></ul>");
});
  
app.listen(900, function(){    // tells to listen on a specific code for nay http request,,,,,,,port- port is basically a channel
  console.log("Server started on port 900");
});