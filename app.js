const http = require('http');
const url = require('url');  
const fs = require('fs');  

const hostname = '127.0.0.1';
const port = 3000;


fs.readFile("Draw.html", function(err, data){
  if(err){
     response.writeHead(404);
     response.write("Not Found!");
  }
  else{
     response.writeHead(200, {'Content-Type': contentType});
     response.write(data);
  }
  response.end();
});

