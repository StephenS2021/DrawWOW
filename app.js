const express = require('express')
const path = require('path')
const app = express();
var bodyParser = require('body-parser')
var canvas = [];
var canvasTiles = [];
var PORT = 3001;

setInterval(drawData, 1500);

app.get('/', function(req, res) {
  res.sendFile( path.join(__dirname, 'Draw.html'))
  
})

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())


function drawData(){
  app.get('/drawData', function(req, res){ //gets onclick data and sets color and sends back the canvas
    var x = parseInt(req.query.x)
    var y = parseInt(req.query.y)
    var color = req.query.col
    // canvas[Math.round(x/10)*10][Math.round(y/10)*10] = color //scales down the x and y to fit canvas which is 1/10 of the screen size with 10x10 pixels

    var newTile = {x: x, y: y, col: color}
    canvasTiles.push(newTile)
    
    var dataCanv = canvasTiles
    res.status(200).json(dataCanv)


  })

}

app.use(function(req, res, next) { //allowing data to be sent from both http://127.0.0.1:3001/ and http://localhost:3001/
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(PORT, function(err){
  if(err){
    console.log('Error starting http server');
  } else {
    console.log("Server running at http://127.0.0.1:" + PORT + "/ or http://localhost:"+PORT+"/");
  };
});
