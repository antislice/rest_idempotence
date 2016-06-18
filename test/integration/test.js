var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../../src/server');

chai.use(chaiHttp);

describe('carts', function() {
  it('should create a cart', function(done) {
    chai.request(server)
      .post('/carts')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      })
  });
});
