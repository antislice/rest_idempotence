var carts = {};
var nextCartId = 1;

var Cart = function() {
  this.id = nextCartId++;
  this.items = {};

  carts[this.id] = this;

  return this;
};

Cart.deleteAll = function() {
  carts = {};
  nextCartId = 1;
}

Cart.get = function(cartId) {
  if (!(cartId in carts))
    throw new Error('cartId ' + cartId + ' does not exist');
  return carts[cartId];
};

Cart.prototype = {

addItems: function(productId, quantity) {
  if (productId in this.items)
    this.items[productId] += quantity;
  else
    this.items[productId] = quantity;
}

};

module.exports = Cart;
