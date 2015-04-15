var env = require('node-env-file');
var hapi = require('hapi');
var path = require('path');
var server;

env(path.resolve(__dirname, './.env'), {raise: true});

server = new hapi.Server();
server.connection();

server.register([
  {
    register: require('./index'),
    options: {}
  }
], function () {
  server.start(function () {
    console.log('server started at: ' + server.info.uri);
  });
});
