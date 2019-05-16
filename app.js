const express = require('express')
const path = require('path')
const http = require('http')
const app = express();
var bodyParser = require('body-parser')
var canvas = [];



app.get( '/', function(req, res) {
  res.sendFile( path.join(__dirname, 'Draw.html'))

})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.post('/dimensions', function(req, res){ //gets dimensions of canvas
  for(let i = 0; i < req.body.height; i++) {
      canvas[i] = [];
      for(let j = 0; j < req.body.width; j++) {
          canvas[i][j] = "#ffffff";
      }
  }
})

app.post('/drawData', function(req, res){ //gets onclick data and sets color
  canvas[req.body.x][req.body.y] = req.body.col
  console.log(canvas[req.body.x][req.body.y])
})

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
