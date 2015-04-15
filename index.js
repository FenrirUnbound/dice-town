var q = require('q');

exports.register = function (server, options, next) {
  var register = q.nbind(server.register, server);

  register({
    register: require('./api'),
    options: {
      select: 'api'
    }
  }, {
    routes: {
      prefix: '/api'
    }
  })
  .then(function () {
    return register({
      register: require('./webserver'),
      options: {
        select: 'web'
      }
    });
  })
  .nodeify(next);
};

exports.register.attributes = {
  pkg: require('./package')
};
