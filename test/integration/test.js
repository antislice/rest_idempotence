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
        should.not.exist(err);
        res.should.have.status(200);
        res.body.id.should.equal(1);
        done();
      })
  });
  
  describe('items', function() {

    beforeEach(function(done) {
      var s = chai.request(server);
      s.post('/carts').end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.id.should.equal(1);
        res.body.purchase.should.equal(false);
        done();
      });
    });

    it('should create items', function(done) {
      var s = chai.request(server);
      s.post('/carts/1/items')
        .send({
          'productId': 'abc',
          'quantity': 5
        })
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.id.should.equal(1);
          res.body.items.should.deep.equal({
            'abc': 5
          });
          res.body.purchase.should.equal(false);
          done();
        });
    });
  
    it('should create items cumulatively', function(done) {
      var s = chai.request(server);
      s.post('/carts/1/items')
        .send({
          'productId': 'abc',
          'quantity': 5
        })
        .end(function(err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.id.should.equal(1);
          res.body.items.should.deep.equal({
            'abc': 5
          });
          res.body.purchase.should.equal(false);
          s.post('/carts/1/items')
            .send({
              'productId': 'abc',
              'quantity': 5
            })
            .end(function(err, res) {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.id.should.equal(1);
              res.body.items.should.deep.equal({
                'abc': 10
              });
              res.body.purchase.should.equal(false);
              done();
            });
        });
    });
  
    it('should not create items if etag missing');
  
    it('should not create items if etag none match');
    
    it('should update items');
    
    it('should not update items if etag missing');
    
    it('should not update items if etag none match');

  })
  
  describe('purchase', function () {
    
    beforeEach(function(done) {
      var s = chai.request(server);
      s.post('/carts').end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.id.should.equal(1);
        res.body.purchase.should.equal(false);
        s.post('/carts/1/items')
          .send({
            'productId': 'abc',
            'quantity': 5
          })
          .end(function(err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.id.should.equal(1);
            res.body.items.should.deep.equal({
              'abc': 5
            });
            res.body.purchase.should.equal(false);
            done();
          });
      });
    });
    
    it('should update purchase', function(done) {
      var s = chai.request(server);
      s.put('/carts/1/purchase').end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.id.should.equal(1);
        res.body.items.should.deep.equal({
          'abc': 5
        })
        res.body.purchase.should.equal(true);
        done(); 
      });
    });
    
    it('should not update purchase twice', function(done) {
      var s = chai.request(server);
      s.put('/carts/1/purchase').end(function(err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.id.should.equal(1);
        res.body.items.should.deep.equal({
          'abc': 5
        })
        res.body.purchase.should.equal(true);
        s.put('/carts/1/purchase').end(function(err, res) {
          should.exist(err);
          res.should.have.status(400);
          done();
        })
      });
    });

  });

});
