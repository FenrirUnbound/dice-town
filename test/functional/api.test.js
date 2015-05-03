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
    var updatedTurnCount = 20150430;

    testRequest({
      method: 'POST',
      url: '/api/games'
    }, server)
    .then(function modifyGame(response) {
      var data = JSON.parse(response.payload);
      data.turns = {
        count: updatedTurnCount
      };
      return data;
    })
    .then(function updateGame(gameData) {
      var gameId = gameData.gameId;
      return testRequest({
        method: 'PUT',
        payload: JSON.stringify(gameData),
        url: '/api/games/' + gameId
      }, server);
    })
    .then(function verify(response) {
      var data;
      expect(response.statusCode).to.equal(200);
      data = JSON.parse(response.payload);
      expect(data).to.have.property('turns')
        .that.has.property('count').that.is.to.equal(updatedTurnCount);
    })
    .done(done);
  });

  it('fetches a game', function testGameFetch(done) {
    var updatedTurnCount = 321;

    testRequest({
      method: 'POST',
      url: '/api/games'
    }, server)
    .then(function modifyGame(response) {
      var data = JSON.parse(response.payload);
      data.turns = {
        count: updatedTurnCount
      };
      return data;
    })
    .then(function updateGame(gameData) {
      var gameId = gameData.gameId;
      return testRequest({
        method: 'PUT',
        payload: JSON.stringify(gameData),
        url: '/api/games/' + gameId
      }, server)
      .then(function parsePayload(response) {
        return JSON.parse(response.payload);
      });
    })
    .then(function fetchGame(gameData) {
      return testRequest({
        method: 'GET',
        url: '/api/games/' + gameData.gameId
      }, server)
      .then(function parsePayload(response) {
        var data;
        expect(response.statusCode).to.equal(200);
        data = JSON.parse(response.payload);
        return {
          fetchedData: data,
          updatedData: gameData
        };
      });
    })
    .then(function verify(data) {
      expect(data.fetchedData).to.deep.equal(data.updatedData);
    })
    .done(done);
  });
});
