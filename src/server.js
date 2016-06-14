var express = require("express");
var bodyParser = require("body-parser")

var cartController = require('./controllers/carts');

var app = express();

app.use(bodyParser.json());

app.post('/carts', cartController.create);
app.get('/carts/:cart_id', cartController.read);
app.post('/carts/:cart_id/items', cartController.createItems);
app.post('/carts/:cart_id/purchases', cartController.createPurchase);

app.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
