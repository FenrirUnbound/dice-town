var hapi = require('hapi');
var server = new hapi.Server();
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
