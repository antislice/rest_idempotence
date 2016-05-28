var carts = {};
var nextCartId = 1;

var Cart = function() {
  this.id = nextCartId++;
  this.items = {};

  carts[this.id] = this;

  return this;
};

Cart.get = function(cartId) {
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
