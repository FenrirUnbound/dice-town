var expect = require('chai').expect;
var path = require('path');
var q = require('q');

describe('API', function describeMain() {
  var server;
  var testRequest = function (options, server) {
    var promise = q.defer();

    server.inject(options, function (response) {
      return promise.resolve(response);
    });

    return promise.promise;
  };

  beforeEach(function (done) {
    var env = require('node-env-file');
    var hapi = require('hapi');
    var plugin = require('../..');

    env(path.resolve(__dirname, '../../.env'), {raise: false});
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
    testRequest({
      method: 'POST',
      url: '/api/games'
    }, server)
    .then(function(response) {
      var data;
      expect(response.statusCode).to.equal(201);
      data = JSON.parse(response.payload);
      expect(data).to.be.an('object')
        .to.have.property('gameId').that.is.greaterThan(0);
    })
    .done(done);
  });

  it('saves a game', function testGameSave(done) {
    testRequest({
      method: 'POST',
      url: '/api/games'
    }, server)
    .then(function createdGame(response) {
      var data = JSON.parse(response.payload);
      return data.gameId;
    })
    .then(function updateGame(gameId) {
      return testRequest({
        method: 'PUT',
        url: '/api/games/' + gameId
      }, server);
    })
    .then(function verify(response) {
      expect(response.statusCode).to.equal(200);
    })
    .done(done);
  });
});
