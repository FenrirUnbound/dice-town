var React = require('react');

var Game = module.exports = React.createClass({
  displayName: 'Game',
  render: function () {
    return (
      React.createElement('h3', null, 'hola mundo')
    );
  }
});

React.render(
  React.createElement(Game, null),
  document.getElementById('content')
);
