var express = require("express");
var bodyParser = require("body-parser")

var app = express();

app.use(bodyParser.json());

var carts = {};
var nextCartId = 1;

app.post('/carts', function(req, res) {
  var cart = {
    id: nextCartId++,
    items: {}
  }
  carts[cart.id] = cart;
  res.json(cart);
});

app.get('/carts/:cart_id', function(req, res) {
  var cartId = req.param('cart_id');
  if (!(cartId in carts)) {
    res.status(404).json(null);
    return;
  }
  res.json(carts[cartId]);
});

app.post('/carts/:cart_id/items', function(req, res) {
  var cartId = req.param('cart_id');
  if (!(cartId in carts)) {
    res.status(404).json(null);
    return;
  }
  var cart = carts[cartId];
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  if (productId in cart.items)
    cart.items[productId] += quantity;
  else
    cart.items[productId] = quantity;
  res.json(cart);
});

app.post('/carts/:cart_id/purchase', function(req, res) {
  /* Fill in the blank! */
});

app.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
