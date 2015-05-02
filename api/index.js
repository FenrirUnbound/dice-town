var datastore = require('./services/datastore');
var game = require('fenrirunbound-skuld');
var path = require('path');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/status',
    handler: function (request, reply) {
      return reply({status: 'OK'});
    }
  });

  server.route({
    method: 'POST',
    path: '/games',
    handler: function (request, reply) {
      datastore.createGame()
      .then(function createGame(gameId) {
        return game.createGame({
          gameId: gameId,
          // TODO: get the game creator's id
          playerId: 1
        });
      })
      .then(function saveGameCreation(gameData) {
        return datastore.saveGame(gameData.gameId, gameData);
      })
      .then(function (gameData) {
        return reply(gameData).code(201);
      })
      .done();
    }
  });

  server.route({
    method: 'PUT',
    path: '/games/{gameId}',
    handler: function (request, reply) {
      var gameId = request.params.gameId;
      var payload = request.payload;

      datastore.saveGame(gameId, payload)
      .then(function (gameData) {
        return reply(gameData).code(200);
      })
      .done();
    }
  });

  next();
};

exports.register.attributes = {
  name: 'dice-town-api',
  version: '1.0.0'
};
