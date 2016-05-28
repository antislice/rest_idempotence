var express = require("express");
var bodyParser = require("body-parser")

var Cart = require('./models/cart');

var app = express();

app.use(bodyParser.json());

app.post('/carts', function(req, res) {
  res.json(new Cart());
});

app.get('/carts/:cart_id', function(req, res) {
  var cartId = req.param('cart_id');
  var cart;
  try {
    cart = Cart.get(cartId);
  }
  catch (e) {
    res.status(404).send('cart_id ' + cartId + ' not found');
    return;
  }
  res.json(cart);
});

app.post('/carts/:cart_id/items', function(req, res) {
  var cartId = req.param('cart_id');
  var cart;
  try {
    cart = Cart.get(cartId);
  }
  catch (e) {
    res.status(404).send('cart_id ' + cartId + ' not found');
    return;
  }
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  if (!productId) {
    res.status(400).send('invalid body: productId');
    return;
  }
  if (!quantity) {
    res.status(400).send('invalid body: quantity');
    return;
  }
  cart.addItems(productId, quantity);
  res.json(cart);
});

app.post('/carts/:cart_id/purchases', function(req, res) {
  /* Fill in the blank! */
});

app.listen(process.env.PORT, function() {
  console.log(`Server running at http://${process.env.IP}:${process.env.PORT}/`);
});
