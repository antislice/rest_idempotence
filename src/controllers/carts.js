var Cart = require('../models/cart');

exports.create = function(req, res) {
  res.json(new Cart());
};

exports.read = function(req, res) {
  var cartId = req.params['cart_id'];
  var cart;
  try {
    cart = Cart.get(cartId);
  }
  catch (e) {
    res.status(404).send('cart_id ' + cartId + ' not found');
    return;
  }
  res.json(cart);
};

exports.createItems = function(req, res) {
  var cartId = req.params['cart_id'];
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
};

exports.createPurchase = function(req, res) {
  /* Fill in the blank! */
  res.status(500).json(null);
};
