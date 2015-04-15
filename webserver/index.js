var boom = require('boom');
var browserify = require('browserify');
var mainScript;
var path = require('path');
var SCRIPTS_CACHE = {};

exports.register = function (server, options, next) {
    server.views({
      engines: {
        html: require("handlebars")
      },
      relativeTo: __dirname,
      path: "../views/templates"
    });

  server.route({
    method: 'GET',
    path: '/scripts/{scriptName}.js',
    handler: function (request, reply) {
      var scriptName = request.params.scriptName;
      if (SCRIPTS_CACHE.hasOwnProperty(scriptName)) {
        return reply(SCRIPTS_CACHE[scriptName]).type('text/javascript');
      }

      var filepath = path.resolve(__dirname, '../lib/' + scriptName);
      browserify(filepath).bundle(function (error, buffer) {
        if (error) {
          return reply(boom.notFound());
        }

        SCRIPTS_CACHE[scriptName] = buffer.toString();
        return reply(SCRIPTS_CACHE[scriptName]).type('text/javascript');
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/games/{gameId}',
    handler: function (request, reply) {
      var gameId = request.params.gameId;
      reply.view('game.html', {gameId: gameId});
    }
  });

  server.route({
    method: 'GET',
    path: '/admin.html',
    handler: function (request, reply) {
      var filepath = path.resolve(__dirname, '../views/admin.html');
      return reply.file(filepath);
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      // TODO: move views local to webserver plugin
      var filepath = path.resolve(__dirname, '../views/main.html');
      return reply.file(filepath);
    }
  });

  next();
};

exports.register.attributes = {
  name: 'dice-town-webserver',
  version: '1.0.0'
};
