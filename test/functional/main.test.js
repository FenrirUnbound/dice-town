var expect = require('chai').expect;

describe('Main', function describeMain() {
  var server;

  beforeEach(function (done) {
    var hapi = require('hapi');
    var plugin = require('../..');
    server = new hapi.Server();
    server.connection();
    server.register({
      register: plugin
    }, done);
  });

  afterEach(function (done) {
    server.stop(done);
  });


  it('has a main page', function testStatus(done) {
    server.inject({
      method: 'GET',
      url: '/'
    }, function (response) {
      var data;
      expect(response.statusCode).to.equal(200);
      expect(response.headers).to.have.property('content-type')
        .that.equal('text/html');
      done();
    });
  });
});
