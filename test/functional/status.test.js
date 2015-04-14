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


  it('has a plugin status', function testStatus(done) {
    server.inject({
      method: 'GET',
      url: '/status'
    }, function (response) {
      var data;
      expect(response.statusCode).to.equal(200);
      data = JSON.parse(response.payload);
      expect(data).to.deep.equal({status:'OK'});
      done();
    });
  });
});
