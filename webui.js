var express = require('express');
var app = express();

app.get("/", function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);    
});

module.exports.start = function(){
    app.listen(3000);
}
