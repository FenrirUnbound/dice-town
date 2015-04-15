var expect = require('chai').expect;
var path = require('path');

describe('API', function describeMain() {
  var server;

  beforeEach(function (done) {
    var env = require('node-env-file');
    var hapi = require('hapi');
    var plugin = require('../..');

    env(path.resolve(__dirname, '../../.env'), {raise: true});
    server = new hapi.Server();
    server.connection();
    server.register({
      register: plugin
    }, done);
  });

  afterEach(function (done) {
    server.stop(done);
  });


  it('creates a game', function testGameCreate(done) {
    server.inject({
      method: 'POST',
      url: '/api/games'
    }, function (response) {
      var data;
      expect(response.statusCode).to.equal(201);
      data = JSON.parse(response.payload);
      expect(data).to.be.an('object')
        .to.have.property('gameId').that.is.greaterThan(0);
      done();
    });
  });
});
