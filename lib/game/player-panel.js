var Bootstrap = require('react-bootstrap');
var Dice = require('./dice');
var Properties = require('./properties');
var React = require('react');
var Wallet = require('./wallet');

var PlayerPanel = module.exports = React.createClass({
  displayName: 'Player Panel',
  render: function () {
    return (
      React.createElement('section', null,
        React.createElement('section', null,
          React.createElement('div', {className: 'col-xs-0 col-sm-1'}),  // for spacing
          React.createElement('div', {className: 'col-xs-6 col-sm-5' },
            React.createElement(Wallet, {walletValue: 3})
          ),
          React.createElement('div', {className: 'col-xs-6 col-sm-5'},
            React.createElement(Dice, null)
          ),
          React.createElement('div', {className: 'col-xs-0 col-sm-1'})  // for spacing
        ),
        React.createElement('section', null,
          React.createElement('div', {className: 'col-xs-12'},
            React.createElement(Properties, {className: 'col-xs-10'})
          )
        )
      )
    );
  }
});
