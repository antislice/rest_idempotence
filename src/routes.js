var cartsController = require('./controllers/carts');

module.exports = exports = function(app) {

app.param('cart_id', cartsController.param);
app.post('/carts', cartsController.create);
app.get('/carts/:cart_id', cartsController.read);
app.post('/carts/:cart_id/items', cartsController.createItems);
app.put('/carts/:cart_id/items', cartsController.updateItems);
app.put('/carts/:cart_id/purchase', cartsController.updatePurchase);

};
