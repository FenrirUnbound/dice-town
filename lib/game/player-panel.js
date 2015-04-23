var Bootstrap = require('react-bootstrap');
var Dice = require('./dice');
var React = require('react');
var Wallet = require('./wallet');

var PlayerPanel = module.exports = React.createClass({
  displayName: 'Player Panel',
  render: function () {
    return (
      React.createElement('section', {className: 'row'},
        React.createElement('div', {className: 'col-xs-0 col-sm-1'}),
        React.createElement('div', {className: 'col-xs-6 col-sm-5' },
          React.createElement(Wallet, {walletValue: 3})
        ),
        React.createElement('div', {className: 'col-xs-6 col-sm-5'},
          React.createElement(Dice, null)
        ),
        React.createElement('div', {className: 'col-xs-0 col-sm-1'})
      )
    );
  }
});
