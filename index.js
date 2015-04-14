exports.register = function (server, options, next) {
  server.views({
    engines: {
      html: {
        module: require('handlebars'),
        compileMode: 'sync'
      }
    },
    path: './views'
  });

  server.route({
    method: 'GET',
    path: '/status',
    handler: function (request, reply) {
      reply({status: 'OK'});
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'main'
    }
  });

  next();
};

exports.register.attributes = {
  pkg: require('./package')
};
