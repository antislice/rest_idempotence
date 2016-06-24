var Cart = require('../models/cart');
var cartView = require('../views/cart');

exports.param = function(req, res, next, cartId) {
  try {
    var cart = Cart.get(cartId);
  }
  catch (e) {
    res.status(404).send('cart_id ' + cartId + ' not found');
    return;
  }
  req.cart = cart;
  next();
};

exports.create = function(req, res) {
  var cart = new Cart();
  res.status(201);
  res.set(cartView.header(cart));
  res.send(cartView.body(cart));
};

exports.read = function(req, res) {
  res.set(cartView.header(req.cart));
  res.send(cartView.body(req.cart));
};

exports.createItems = function(req, res) {
  var productId = req.body.productId;
  var quantity = req.body.quantity;
  if (!req.header['items-etag']) {
    res.status(428).send('lol no etag');
    return;
  }
  if (!productId) {
    res.status(400).send('invalid body: missing productId');
    return;
  }
  if (typeof(productId) != 'string') {
    res.status(400).send('invalid body: productId must be string');
    return;
  }
  if (!quantity) {
    res.status(400).send('invalid body: missing quantity');
    return;
  }
  if (typeof(quantity) != 'number') {
    res.status(400).send('invalid body: quantity must be number');
    return;
  }
  req.cart.addItems(productId, quantity);
  res.status(201);
  res.set(cartView.header(req.cart));
  res.send(cartView.body(req.cart.items));
};

exports.updateItems = function(req, res) {
  try {
    req.cart.setItems(req.body);
  }
  catch (e) {
    res.status(400).send('invalid body: ' + e.message);
    return;
  }
  res.set(cartView.header(req.cart));
  res.send(cartView.body(req.cart));
};

exports.updatePurchase = function(req, res) {
  req.cart.purchase = true;
  res.set(cartView.header(req.cart));
  res.send(cartView.body(req.cart));
};
