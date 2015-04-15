var browserify = require('browserify');
var mainScript;
var path = require('path');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/scripts/main.js',
    handler: function (request, reply) {
      if (!!mainScript) {
        reply(mainScript).type('text/javascript');
      } else {
        var filepath = path.resolve(__dirname, '../lib/main');
        browserify(filepath).bundle(function (error, buffer) {
          mainScript = buffer.toString();
          return reply(mainScript).type('text/javascript');
        });
      }
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
