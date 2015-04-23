var Bootstrap = require('react-bootstrap');
var React = require('react');

var Properties = module.exports = React.createClass({
  displayName: 'Properties',
  render: function () {
    return (
      React.createElement('section', null,
        React.createElement(Bootstrap.Panel, {header: 'Properties'})
      )
    );
  }
});
