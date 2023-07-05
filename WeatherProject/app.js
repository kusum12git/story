const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser"); // Import body-parser

const app = express();

const apiKey = "650a71998b07a39e2b29f78735212ed0";

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    fs.readFile(__dirname + "/index.html", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Error occurred while reading index.html");
        } else {
            res.send(data);
        }
    });
});
 
app.post("/", function (req, res) {
    console.log("Post request received.");

    const query = req.body.CityName;
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

const port = 1000;
app.listen(port, function () {
    console.log("Server is running on port " + port + ".");
});
