exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/status',
    handler: function (request, reply) {
      reply({status: 'OK'});
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package')
};
