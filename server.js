var express = require("express");
var app = express();

app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
