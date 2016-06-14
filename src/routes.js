var cartsController = require('./controllers/carts');

module.exports = exports = function(app) {

app.post('/carts', cartsController.create);
app.get('/carts/:cart_id', cartsController.read);
app.post('/carts/:cart_id/items', cartsController.createItems);
app.post('/carts/:cart_id/purchases', cartsController.createPurchase);

};
