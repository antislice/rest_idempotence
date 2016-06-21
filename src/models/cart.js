var hash = require('object-hash');

var carts = {};
var nextCartId = 1;

var Cart = function() {
  this.id = nextCartId++;
  this.items = {};
  this.purchase = false;

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
},

setItems: function(items) {
  if (typeof(items) != 'object')
    throw new Error('items must be object');
  for (var key in items) {
    if (typeof(key) != 'string')
      throw new Error('key (productId) must be string');
    var value = items[key];
    if (typeof(value) != 'number')
      throw new Error('value (quantity) must be number');
  }
  this.items = items;
},

itemsHash: function() {
  return hash(this.items);
}

};

module.exports = Cart;
