const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '8a2ee32488e02f87923cee1f6487f8ed';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

const httpsPort = 8080;

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
        let weather = JSON.parse(body)
                
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let text = `The temperature in ${weather.name} is ${convC(weather.main.temp)}, with minimum of ${convC(weather.main.temp_min)} and maximum of ${convC(weather.main.temp_max)}`;
          res.render('index', {weather: text, error: null});
        }
    }
  });
})

function convC(fahrenheit) 
{
  var fTemp = fahrenheit;
  var fToCel = (fTemp - 32) * 5 / 9;
  var message =  fToCel.toFixed(0) + '\xB0C.';
    return message;
} 
app.listen(httpsPort, function () {
  console.log('Listening on port '+ httpsPort )
})