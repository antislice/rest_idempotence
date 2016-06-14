var express = require("express");
var bodyParser = require("body-parser")


var app = express();

app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
