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
  
  it('should create a purchase', function(done) {
    var s = chai.request(server);
    s.post('/carts').end(function(err, res) {
      should.not.exist(err);
      res.body.id.should.equal(1);
      s.post('/carts/1/items', {
        'productId': 1,
        'quantity': 5
      }).end(function(err, res) {
        s.post('/carts/1/purchases').end(function(err, res) {
          res.should.have.status(200);
          done(); 
        });
      });
    });
  });
  
  it('should not create a second purchase', function(done) {
    var s = chai.request(server);
    s.post('/carts').end(function(err, res) {
      s.post('/carts/1/items', {
        'productId': 1,
        'quantity': 5
      }).end(function(err, res) {
        s.post('/carts/1/purchases').end(function(err, res) {
          s.post('/carts/1/purchases').end(function(err, res) {
            res.should.have.status(400);
            done();
          })
        });
      });
    });
  });
  
});
