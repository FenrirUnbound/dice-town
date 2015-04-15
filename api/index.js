var datastore = require('./services/datastore');
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
      .then(function (gameData) {
        return reply(gameData).code(201);
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
