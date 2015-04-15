var browserify = require('browserify');
var mainScript;
var path = require('path');

exports.register = function (server, options, next) {
  server.register([
    {
      register: require('./api'),
      options: {
        select: 'api'
      }
    },
    {
      register: require('./webserver'),
      options: {
        select: 'web'
      }
    }
  ], function (error) {
    next();
  });
};

exports.register.attributes = {
  pkg: require('./package')
};
