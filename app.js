const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apikey = "add key here";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data); //Convert hexa into JSON object
      const temp = weatherData.main.temp;
      const image = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + image + "@2x.png";
      const description = weatherData.weather[0].description;
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
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
});
// res.send("server is running");






app.listen(3000, function() {
  console.log("Web site Started and lsitening on port 3000");
});
