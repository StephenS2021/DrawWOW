const express = require('express')
const path = require('path')

const server = http.createServer()
const app = express();

app.get( '/', function(req, res) {
  res.sendFile( path.join(__dirname, 'Draw.html'))
})


app.listen(3000, function() {
  console.log('Server Running')
})
