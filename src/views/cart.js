exports.header = function(cart) {
  return {
    'Content-Type': 'application/json',
    'Items-ETag': cart.itemsHash()
  };
};

exports.body = function(cart) {
  return JSON.stringify(cart, null, 2);
};

exports.itemsHeader = function(cart) {
  return {
    'Content-Type': 'application/json',
    'ETag': cart.itemsHash()
  };
};

exports.itemsBody = function(cart) {
  return JSON.stringify(cart.items, null, 2);
}