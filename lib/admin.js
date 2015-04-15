var React = require('react');

var Admin = module.exports = React.createClass({
  displayName: 'Admin',
  render: function () {
    return (
      React.createElement('h1', null, 'hola mundo')
    );
  }
});

React.render(
  React.createElement(Admin, null),
  document.getElementById('content')
)
