const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=7046a7009e64d2964bd78cfcd546b2e5&units=metric";
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData=JSON.parse(data); //Convert hexa into JSON object
      const temp = weatherData.main.temp;
      const image = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+ image +"@2x.png";
      const description = weatherData.weather[0].description;
      res.write("<h1>The temperature in Zurich is " + temp + " degrees Celcius</h1>");
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();

      // const object = {
      //   name : "Chris",
      //   favouritefood : "Carbonara"
      // }
      // console.log(JSON.stringify(object));

    });

  });
  // res.send("server is running");
});









app.listen(3000, function() {
  console.log("Web site Started and lsitening on port 3000");
});
