const express = require('express')
const path = require('path')
const http = require('http')
const app = express();
var bodyParser = require('body-parser')
var canvas = [];

setInterval(drawData, 1500);

app.get('/', function(req, res) {
  res.sendFile( path.join(__dirname, 'Draw.html'))


})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.post('/dimensions', function(req, res){ //gets dimensions of canvas
  for(let i = 0; i < req.body.height/10; i++) {
      canvas[i] = [];
      for(let j = 0; j < req.body.width/10; j++) {
          canvas[i][j] = "#ffffff";
      }
  }

})
function drawData(){
  app.get('/drawData', function(req, res){ //gets onclick data and sets color
    x = res.query.x/10
    y = res.query.y/10
    // canvas[Math.round(x/10)*10][Math.round(y/10)*10] = res.body.col //scales down the x and y to fit canvas which is 1/10 of the screen size with 10x10 pixels
    // console.log(canvas[Math.round(x/10)*10][Math.round(y/10)*10])
    console.log(req.query.y)

  })
}

app.use(function(req, res, next) { //allowing data to be sent from both http://127.0.0.1:3000/ and http://localhost:3000/
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(3000, function(err){
  if(err){
    console.log('Error starting http server');
  } else {
    console.log("Server running at http://127.0.0.1:3000/ or http://localhost:3000/");
  };
});
