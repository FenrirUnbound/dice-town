var path = require('path');

exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/status',
    handler: function (request, reply) {
      return reply({status: 'OK'});
    }
  });

  next();
};

exports.register.attributes = {
  name: 'dice-town-api',
  version: '1.0.0'
};
