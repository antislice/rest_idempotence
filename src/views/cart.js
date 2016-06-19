exports.header = function(cart) {
  return {
    'Content-Type': 'application/json'
  };
};

exports.body = function(cart) {
  return JSON.stringify(cart, null, 2);
};
