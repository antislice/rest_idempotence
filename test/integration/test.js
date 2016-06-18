var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../../src/server');
var Cart = require('../../src/models/cart');

chai.use(chaiHttp);

describe('carts', function() {

  afterEach(function(done) {
    Cart.deleteAll();
    done();
  });

  it('should create a cart', function(done) {
    chai.request(server)
      .post('/carts')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });
  
  it('should create a purchase');
  
  it('should not create a second purchase');
  
});
