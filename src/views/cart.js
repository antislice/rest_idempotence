var hash = require('object-hash');

exports.header = function(cart) {
  return {
    'Content-Type': 'application/json',
    'items-etag': hash(cart)
  };
};

exports.body = function(cart) {
  return JSON.stringify(cart, null, 2);
};
